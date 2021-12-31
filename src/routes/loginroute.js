const express = require('express'); 
const loginRouter = express.Router();
const user = require('../data/user');

loginRouter.get('/',function(req,res){

    res.render('login',{});
    
})


loginRouter.get("/check",function(req,res){ 
    var checkuser = {
        uid:req.query("uid"), //Part #2 Point 10
        pwd:req.query("pwd") //Part #2 Point 10
    };
    
    console.log(checkuser);
    var flag=false;

//    var flagg = user.find((e)=>{
       for(let i=0;i<user.length;i++){
        
        if(checkuser.uid==user[i].uid && checkuser.pwd==user[i].pwd)
        {
            
            flag=true;
            break;
        }
        else{
                flag=false;
            }
        };

        console.log(flag);

if(flag==true){
    // alert("User Verified.Click to continue");
    res.redirect("/home")
}
else{
    // alert("User Verification Failed");
    res.redirect("/signup");
}

});




module.exports = loginRouter;