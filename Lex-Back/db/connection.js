const mongoose = require('mongoose');
const URL = 'mongodb+srv://Tushar:tushar123@cluster0.ea934wt.mongodb.net/AlexaDB?retryWrites=true&w=majority';
mongoose.connect(URL,{maxPoolSize:5},(err)=>{
    if(err){
        console.log('DB Error ', err);
    }
    else{
        console.log('DB Connection Created...');
    }
});
module.exports = mongoose;