## Installation

```bash
npm install sign-s3
```

## Usage as a module

Also find the following in the sample provided.

```javascript
var signS3 = require('sign-s3')({
    S3_BUCKET : '<your bucker name>',
    S3_ACCESS_KEY : '<your AWS access key for s3>',
    S3_ACCESS_SECRET : '<your AWS secret>',
    S3_REGION : '<your aws region defaults to us-west-1>',
    HOST_NAME :'<custom url like cloud front. will be derived from bucket and region if not provided>'
})
```

## Usage as a Express router

Also find the following in the sample provided

```javascript
const express = require('express');
const app = express();

//Initialzed by setting the environment variables.
const signS3Router = require('sign-s3/router');

//In your app or router
app.route('/sign-s3-route', signS3Router);
```