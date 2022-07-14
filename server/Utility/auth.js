const jwt = require('jsonwebtoken');
 module.exports = (req, res, next) => {
     try{
      
        var token = req.headers.authorization.split(" ")[1];
        var decode = jwt.verify(token, 'secret');
        req.userdata = decode;
        next(); 
     }catch(error){
         console.log('Something Wents Wrongs OR Invalid Token...', error);
     }
 }