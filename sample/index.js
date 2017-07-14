const express = require("express");
const signS3 = require('sign-s3')({
    S3_BUCKET : 'volery-images',
    S3_ACCESS_KEY : 'AKIAIA5SJQH2TVBS6NEQ',
    S3_ACCESS_SECRET : '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',
    S3_REGION : 'ap-south-1',
    HOST_NAME :'https://diko2ohln5bxp.cloudfront.net'
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