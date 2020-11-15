// const express= require('express');
const db = require("./db");
// const multer = require('multer');
// const csv = require('fast-csv');

// const Router = express.Router;

// const upload = multer({ dest: 'tmp/csv/' });
//const app = express();
// const router = new Router();


let details = {

    femey:{userName:"femey rose" ,firstName:"femey" ,lastName: "rose",address:"variath", pincode: 682034,userlist:[]},
    fenil:{userName:"fenil joseph" ,firstName:"fenil" ,lastName: "joseph",address:"variath", pincode: 682034,userlist:[]},
    feivel:{userName:"feivel joseph" ,firstName:"feivel" ,lastName: "joseph",address:"chakkalaparambil", pincode: 682027,userlist:[]},
    elissa:{userName:"elissa rose" ,firstName:"elissa" ,lastName: "rose",address:"uzhunnumkattil", pincode: 682045,userlist:[]},
  }
  
 let currentUser;

  const create = (userName,firstName,lastName,address, pincode) => {
    return db.User.findOne({
        userName
    })
      .then(user => {
        if (user) {
          return {
            status: false,
            statusCode: 422,
            message: "User already exists. Please create another user"
          }
         
        }
        const newUser = new db.User({
            userName,firstName,lastName,address, pincode,userlist:[] 
        });
        //newUser.save();
            
              newUser.save();
        return {
          status: true,
          statusCode: 200,
          message: "User created successfully", 
          userlist: newUser.userlist
        }       
      })
  }

  

  const find = (userName) => {
    return db.User.findOne({
        userName
    })
      .then(user => {
        if (user) {
          return {
            status: true,
            statusCode: 200,
            message: "This user is found in the record"
          }
         
        }
        else{
            return {
                status: false,
                statusCode: 422,
                message: "User not found"
                
              }
        }
    })
}

const getUsers = (req) => {
    return db.User.find({
      
      })

      .then(user=>
        {
        return{
        status:true,
        statusCode:200,
        userlist: user,
    }
})

}



const deleteUser = (id) => {
    return db.User.findOneAndDelete({
        _id:id
    })
  
    .then(user=>{
      
      return {
        status:true,
        statusCode:200,
        message:'User deleted successfully'
      }
    })
}

const updateUser = (id,data)=>{
  return db.User.findOneAndUpdate ({
      _id:id
  },data)
  }


  //csv file upload

  // const fileRows = [];
  // csv.fromPath(req.file.path)
  //   .on("data", function (data) {
  //     fileRows.push(data); // push each row
  //   })

    // const fileRows = [];
    // csv.fromPath(req.file.path)
    //   .on("data", function (data) {
    //     fileRows.push(data); // push each row
    //   })
    //   .on("end", function () {
    //     console.log(fileRows) //contains array of arrays. Each inner array represents row of the csv file, with each element of it a column
    //     fs.unlinkSync(req.file.path);   // remove temp file
    //     //process "fileRows" and respond
    //   })



  module.exports = {
   create,
   find,
   getUsers,
   deleteUser,
   updateUser
  }