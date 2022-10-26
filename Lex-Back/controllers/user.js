const messages = require('../utils/locale/en');
const repo = require('../db/repository/user_operations');
const user_operations = require('../db/repository/user_operations');
module.exports = {
    login(request, response){
        //console.log(request.body);
        const userObject = request.body;
       // console.log('USER #### ', userObject);
        user_operations.find(userObject, response);
        // if(userObject.userid === userObject.password){
        //     response.json({message:messages['welcome']+userObject.userid});
        // }
        // else{
        //     response.json({message:messages['invalid']});
        // }
    },
    async adminPanel(request, response){
        const userObject = request.body;
        // Repository
        const result = await repo.add(userObject);
        //response.json(result);
        if(result && result.keyword){
            //console.log(result);
            response.json({message:'Keyword Added SuccessFully '});
        }
        else{
            response.json({message:'Problem in Adding Keyword'});
        }
        // const promise = repo.add(userObject);
        // promise.then(result=>{

        // })

    },
    findUrl(request,response){
        const userObject=request.body;
        //console.log(userObject);
        user_operations.find(userObject,response);
    }

}