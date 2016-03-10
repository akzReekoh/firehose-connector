'use strict';

var platform = require('./platform'),
    isPlainObject = require('lodash.isplainobject'),
    isArray = require('lodash.isarray'),
    async = require('async'),
	deliveryStreamName, firehoseClient;

let sendData = (data) => {
    firehoseClient.putRecord({
        DeliveryStreamName: deliveryStreamName,
        Record: {
            Data: JSON.stringify(data)
        }
    }, function(error, response) {
        if(error){
            console.error(error);
            platform.handleException(error);
        }
        else{
            platform.log(JSON.stringify({
                title: 'AWS Firehose record saved.',
                data: {
                    Data: data,
                    DeliveryStreamName: deliveryStreamName
                }
            }));
        }
    });
};

platform.on('data', function (data) {
    if(isPlainObject(data)){
        sendData(data);
    }
    else if(isArray(data)){
        async.each(data, (datum) => {
            sendData(datum);
        });
    }
    else
        platform.handleException(new Error('Invalid data received. Must be a valid Array/JSON Object. Data ' + data));
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {
    var AWS = require('aws-sdk');

    deliveryStreamName = options.delivery_stream_name;
    firehoseClient = new AWS.Firehose({
        accessKeyId: options.access_key_id,
        secretAccessKey: options.secret_access_key,
        region: options.region,
        version: options.api_version,
        sslEnabled: true
    });

    platform.log('AWS Firehose Connector Initialized.');
	platform.notifyReady();
});