const express = require("express");
const signS3 = require('sign-s3')({
    S3_BUCKET : '<your bucket name>',
    S3_ACCESS_KEY : '<your s3 access key>',
    S3_ACCESS_SECRET : '<your s3 access secret>',
    S3_REGION : '<s3 bucket region>',
    HOST_NAME :'<alternate host name like cloud front>'
});

const signS3Router = require('sign-s3/router');

const app = express();

app.use('/sign', (req, res, next) => {
    signS3(req.query.fileName , req.query.fileType || 'image/png').then(data => {
        res.status(200).send(data);
    }).catch(err => { console.error(error); next(err); });
})

/**
 * 
 * Just have environment variables set for before using this router.
 * S3_BUCKET,
 * S3_ACCESS_KEY,
 * S3_ACCESS_SECRET,
 * S3_REGION,
 * HOST_NAME
 * 
 */

app.use('/route', signS3Router);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Sample app started on ${PORT}`);
})