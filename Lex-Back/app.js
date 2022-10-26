const express = require('express');
const app = express();
app.use(require('cors')());// Attach Middleware
app.use(express.json());
app.use(express.urlencoded());
// Dynamic - Routing
app.use('/',require('./routes/user'));
const server= app.listen(1234,(err)=>{
    if(err){
        console.log('Server Crash ',err);
    }
    else{
        console.log('Server Start ', server.address().port);
    }
})