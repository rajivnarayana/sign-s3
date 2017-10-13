import { S3 } from "aws-sdk";

declare var process : any;

const defaults = {
    S3_BUCKET : process.env.S3_BUCKET,
    S3_ACCESS_KEY : process.env.S3_ACCESS_KEY,
    S3_ACCESS_SECRET : process.env.S3_ACCESS_SECRET,
    S3_REGION : process.env.S3_REGION || "us-west-1",
    S3_UPLOAD_TIME : process.env.s3_UPLOAD_TIME || 10 * 60,
    HOST_NAME : process.env.CLOUD_FRONT_URL
}

export = function(options) {
    options = Object.assign({}, defaults, options);
    if (!options.S3_BUCKET) {
        throw new Error('Provide a bucket name');
    }
    if (!options.S3_ACCESS_KEY) {
        throw new Error('Provide S3 access key');
    }
    if (!options.S3_ACCESS_SECRET) {
        throw new Error('Provide S3 access secret');
    }
    if (!options.HOST_NAME) {
        options.HOST_NAME = `https://s3.${options.S3_REGION}.amazonaws.com/${options.S3_BUCKET}`
    }
    return async function sign(fileName, fileType, permissions = "public-read") : Promise<{signed_request:string, url:string}> {
        let fileExtention : string = fileName.split('.').pop() || fileType.split('/').pop();
        fileName = `${new Date().getTime()}-${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 6)}.${fileExtention}`
        const s3Params = {
            Bucket : options.S3_BUCKET,
            Key : fileName,
            Expires : options.S3_UPLOAD_TIME,
            ContentType: fileType,
            ACL: permissions
        }
        return new Promise<{signed_request:string, url:string}>((resolve, reject) => {
            new S3({"accessKeyId":options.S3_ACCESS_KEY, "secretAccessKey":options.S3_ACCESS_SECRET, "region":options.S3_REGION}).getSignedUrl('putObject', s3Params, (err, data) => {
                if(err){
                    return reject(err)
                }
                resolve({
                    signed_request: data,
                    url:`${options.HOST_NAME}/${fileName}`
                })
            })
        })
    }
}