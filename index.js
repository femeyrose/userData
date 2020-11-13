const express= require('express');

const dataService =require('./services/data.service');

const session =require('express-session');

const app =express();

app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}));


app.use(express.json());

const logMiddleware=(req,res,next)=>{
    console.log(req.body);
    next();
}

app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
        return res.status(401).json({ 
         status: false,
         statusCode: 401,
         message: "please login",
        });  
     }
     else{
         next();
     }
};

app.get('/',(req,res)=>{
    res.send("hello world ")
})

//create a user

app.post('/create',(req,res)=>{
    dataService.create(req.body.userName,req.body.firstName,req.body.lastName,req.body.address,req.body.pincode)
    
.then (result=>{  
    res.status(result.statusCode).json(result);
})

})

//find the given user exists or not

app.post('/find',(req,res)=>{
    dataService.find(req.body.userName)
    
.then (result=>{  
    res.status(result.statusCode).json(result);
})

})

//lists the users that were created

app.get('/userlist',(req,res)=>{
    dataService.getUsers(req)
    .then(result=>{
        res.status(result.statusCode).json(result);
    });
});

// app.delete('/userlist/:userName',(req,res)=>{ 
//     dataService.deleteUser(req,req.params.userName)
    
//     .then(result=>{
//         res.status(200).json(result);
//     });
// })

app.listen(3000, ()=>
{console.log("server started at port 3000")});




