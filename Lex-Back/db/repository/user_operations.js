const UserModel = require('../models/user');
module.exports = {
    add(userObject){
        var promise = UserModel.create(userObject);
        return promise;
    },
    find(userObject, response){
        UserModel.findOne({keyword:userObject.keyword},(err, doc)=>{
            if(err){
                response.json({message:'Some DB Error  '});
            }
            else if(doc){
                console.log(doc);
                response.json(doc);
            }
            else{
                response.json({message:'Unable to match keyword'});
            }
        })
    }
}
