const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/userdata',
{useNewUrlParser:true,useUnifiedTopology: true});

const User = mongoose.model('User',{
    userName: String,
    firstName: String,
    lastName: String,
    address:String,
    pincode: Number,
    userlist:[{
            username: String,
            firstname: String,
            lastname: String,
            add: String, 
            pin: Number,

    }]
    
});

module.exports={
    User
}