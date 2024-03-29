const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    sex: { type: String, required: true },
    status: { type: String, required: true, default: "NEW" },
    tel: { type: String, required: true},
    email: { 
        type: String,
        required: true,
        unique: true,
        index: true,
        dropDups: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     },
     password: {
         type: String,
         required: true
     },
     contact: { type: String },
     profilePic: { type: String },
     createdAt: Date,
     updatedAt: Date,
     isAdmin: { type: Boolean, required: true, default: false },
     hasAnOrder: { type: Boolean, required: true, default: false }
});


module.exports = mongoose.model('User', userSchema);