# Firehose Connector
[![Build Status](https://travis-ci.org/Reekoh/firehose-connector.svg)](https://travis-ci.org/Reekoh/firehose-connector)
![Dependencies](https://img.shields.io/david/Reekoh/firehose-connector.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/firehose-connector.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

AWS Kinesis Firehose Connector for the Reekoh IoT Platform. Integrates a Reekoh instance to an AWS Kinesis Firehose stream.

## Description
This plugin saves all data from connected devices to the Reekoh Instance to an AWS Kinesis Firehose Stream. The data saved from the stream will then be saved to a configured storage which can be Amazon S3 or Amazon RedShift.

## Configuration
To configure this plugin, an Amazon AWS account and Firehose delivery stream is needed to provide the following:

1. Access Key ID - AWS Access Key ID to use.
2. Secret Access Key - AWS Secret Access Key to use.
3. Region - AWS Region to use.
4. API Version - AWS API Version to use.
5. Delivery Stream Name - AWS Firehose stream to use.

These parameters are then injected to the plugin from the platform.