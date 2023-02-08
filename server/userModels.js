const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(

  {
    id: Number,
    
    name: String,
    
    email:    {type: String, 
              required: [true, "Please provide an email!"],
              unique: [true, "Email already exists"]},
    
    password: {type: String,
              required: [true, "Please provide a password!"],
              unique: false},

    balance: Number,
    
    transactionHistory: {
      type: [{
          type: String,
          amount: Number,
          date: Date
      }],
      default: []
  }
  
  }

);


module.exports = mongoose.model.Users || mongoose.model("UserInfo", UserSchema);