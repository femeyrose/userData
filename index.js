const express= require('express');

const dataService =require('./services/data.service');

const session =require('express-session');

const app =express();

const http = require('http');
const fs = require('fs');

//const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');

const Router = express.Router;


const upload = multer({ dest: 'tmp/csv/' });
//const app = express();
const router = new Router();
const server = http.createServer(app);

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

// app.get('/',(req,res)=>{
//     res.send("hello world ")
// })

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


//delete a user

app.delete('/userlist/:id',(req,res)=>{ 
    dataService.deleteUser(req.params.id)
    .then(result=>{
        res.status(200).json(result);
    });
})

//update a user

app.put('/:id',function(req,res,next){
    let data=req.body;
    dataService.updateUser(req.params.id,data)
    .then(data=>{
      res.status(200).json({
        message:"User updated successfully"
      });
    });
  });


router.post('/', upload.single('file'), function (req, res) {
    const fileRows = [];
  
    // open uploaded file
    csv.fromPath(req.file.path)
      .on("data", function (data) {
        fileRows.push(data); // push each row
        console.log(data)
      })
      .on("end", function () {
        console.log(fileRows)
        fs.unlinkSync(req.file.path);   // remove temp file
        //process "fileRows" and respond
        console.log("read finished")
      })
  });
  
  app.use('/upload-csv', router);
   

  

app.listen(3000, ()=>
{console.log("server started at port 3000")});




