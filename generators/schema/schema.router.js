import express from 'express';
import db from '../../db';
import HttpResponse from '../http/HttpResponse';
import mongoose from 'mongoose';

function stringifyAttribute(schema) {
    const newSchema = {};
    const _TYPES_ = {
        'Date': Date,
        'Number': Number,
        'Boolean': Boolean,
        'ObjectId': mongoose.Types.ObjectId,
    };
    for (const attr in schema) {
        let founded = false;
        for (const subAttr in _TYPES_) {
            if (schema[attr] === _TYPES_[subAttr]) {
                newSchema[attr] = subAttr;
                founded = true;
                break;
            } else {
                if (schema[attr].type && schema[attr].type === _TYPES_[subAttr]) {
                    newSchema[attr] = { ...schema[attr], type: subAttr };
                    founded = true;
                    break;
                }
            }
        }
        if (!founded) {
            newSchema[attr] = schema[attr];
        }
    }
    return newSchema;
}

function stringifySchema(schema) {
    const newSchema = {};
    for (const attr in schema) {
        newSchema[attr] = stringifyAttribute(schema[attr]);
    }
    return newSchema;
}


function createSchemaRouter(app) {
    const router = express.Router();

    router.get('/', (req, res) => {
        const httpResponse = new HttpResponse(res, 'schema');
        httpResponse.json(200, stringifySchema(db));
    });

    router.get('/:name', (req, res) => {
        const name = req.params.name;
        const httpResponse = new HttpResponse(res, 'schema/' + name);
        if (!(name in db)) {
            httpResponse.json(404, null, 'The collection name provided does not exists');
        } else {
            httpResponse.json(200, db[name]);
        }
    });

    app.use('/api/schema', router);
}

export default createSchemaRouter;