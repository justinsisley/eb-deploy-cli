#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const { argv } = require('yargs');

module.exports = async () => {
  const {
    source,
    label,
    accessKeyId,
    secretAccessKey,
    region,
    bucket,
    applicationName,
    environmentName,
  } = argv;

  AWS.config.update({
    accessKeyId,
    secretAccessKey,
    region,
  });

  const s3 = new AWS.S3();
  const elasticbeanstalk = new AWS.ElasticBeanstalk();

  // Upload app bundle zip to S3
  async function uploadToS3() {
    return new Promise((resolve, reject) => {
      s3.upload({
        Bucket: bucket,
        Key: `${label}.zip`,
        Body: fs.readFileSync(path.resolve(process.cwd(), source)),
      }, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  // Create a new application version in Elastic Beanstalk
  async function createAppVersion() {
    return new Promise((resolve, reject) => {
      elasticbeanstalk.createApplicationVersion({
        ApplicationName: applicationName,
        Process: true,
        SourceBundle: {
          S3Bucket: bucket,
          S3Key: `${label}.zip`,
        },
        VersionLabel: label,
      }, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  // Point the Elastic Beanstalk environment to the new version
  async function updateEBEnv() {
    return new Promise((resolve, reject) => {
      elasticbeanstalk.updateEnvironment({
        EnvironmentName: environmentName,
        VersionLabel: label,
      }, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  await uploadToS3();
  await createAppVersion();
  await updateEBEnv();
};
