const db = require("./db");

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
            newUser.userlist.push({
            username: 'userName',
            firstname: 'firstName',
            lastname: 'lastName',
            add: 'address', 
            pin: pincode,
            id: Math.floor(Math.random() * 100000)
              });
              newUser.save();
        
        return {
          status: true,
          statusCode: 200,
          message: "User created successfully",
          
          
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
        userlist:req.userlist
      })

      .then(user=>
        {
        return{
        status:true,
        statusCode:200,
        userlist: user.userlist,
    }
})

}



// const deleteUser = (userName) => {
//     return db.User.findOne({
//         userName 
//     })
  
//     .then(user=>{
//       user.userName=user.userName.filter(t=>{
//         if(t._userName==userName){
//           return false
//         }
//         return true;
//       })
//       user.save();
//       return {
//         status:true,
//         statusCode:200,
//         message:'User deleted successfully'
//       }
//     })
// }

  module.exports = {
   create,
   find,
   getUsers,
//    deleteUser
  }