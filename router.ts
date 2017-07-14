import { Router } from "express";
import * as bodyParser from "body-parser";
import * as signModule from "./";

const router = Router();

router.use(bodyParser.urlencoded({extended : true}));
router.route('/').post((req, res, next) => {
    req.query = req.query || {};
    req.query.file_name = req.body.file_name;
    req.query.file_type = req.body.file_type;
    next();
}).all(async (req, res, next) => {
    try {
        res.status(200).send(await signModule()(req.query.file_name, req.query.file_type));
    } catch (err) {
        next(err);
    }
});

export = router;