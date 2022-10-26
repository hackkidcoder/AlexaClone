// Collection Structure
const { SchemaTypes } = require('mongoose');
const connection = require('../connection');
const Schema = connection.Schema;
const userSchema = new Schema({
    'keyword':{type:SchemaTypes.String, required:true, unique:true},
    'url':{type:SchemaTypes.String, required:true,unique:true},
    'category':{type:SchemaTypes.String,required:true}
});
const UserModel = connection.model('AlexaDB', userSchema);
module.exports = UserModel;
