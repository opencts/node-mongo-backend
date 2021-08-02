import mongoose from 'mongoose'
import generateMongoSchema from '../generators/schema/validation';

export default function createModel(route) {
    return mongoose.model(route.name, generateMongoSchema(route.schema))
}