import * as AWS from 'aws-sdk';
import { AwsConfig } from '../../config/aws.config';

const s3 = new AWS.S3({
  accessKeyId: AwsConfig.accessKeyId,
  secretAccessKey: AwsConfig.secretAccessKey,
  region: AwsConfig.region,
});

export const uploadFile = async (file) => {
  const { originalname } = file;
  const s3Response = await s3_upload(file.buffer, originalname, file.mimetype);
  return s3Response.Location;
};

const s3_upload = async (file, name, mimetype) => {
  const params = {
    Bucket: AwsConfig.bucket,
    Key: String(name),
    Body: file,
    ACL: AwsConfig.acl,
    ContentType: mimetype,
    ContentDisposition: 'inline',
    CreateBucketConfiguration: {
      LocationConstraint: 'ap-south-1',
    },
  };
  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response;
  } catch (e) {
    console.log(e);
  }
};

export const s3_upload_base64 = async (image: Buffer) => {
  const key = Date.now().toString();
  const params: any = {
    Bucket: AwsConfig.bucket,
    Key: key,
    Body: image,
    ACL: AwsConfig.acl,
    ContentType: 'image/jpeg',
    ContentEncoding: 'base64',
    ContentDisposition: 'inline',
    CreateBucketConfiguration: {
      LocationConstraint: 'ap-south-1',
    },
  };
  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response;
  } catch (e) {
    console.log(e);
  }
};
