'use strict';

const REGION = 'us-east-1',
    API_VERSION = '2015-08-04',
    ACCESS_KEY_ID = 'AKIAJCDH5ZSQYJHPXOZQ',
    SECRET_ACCESS_KEY= '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',
    DELIVERY_STREAM_NAME = 'reekoh-firehose';

var cp     = require('child_process'),
	assert = require('assert'),
	connector;

describe('Connector', function () {
	this.slow(5000);

	after('terminate child process', function () {
        setTimeout(function(){
            connector.kill('SIGKILL');
        }, 5000);
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			connector.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			connector.send({
				type: 'ready',
				data: {
					options: {
                        access_key_id: ACCESS_KEY_ID,
                        secret_access_key : SECRET_ACCESS_KEY,
                        region : REGION,
                        api_version : API_VERSION,
                        delivery_stream_name: DELIVERY_STREAM_NAME
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#data', function (done) {
		it('should process the data', function () {
			connector.send({
				type: 'data',
				data: {
                    title: 'Test Message',
                    message: 'This is a test message from AWS Firehose connector plugin.'
				}
			}, done);
		});
	});
});