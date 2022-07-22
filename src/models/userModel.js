const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs")
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true},
    password: { type: String, required: true },
    ppassword: { type: String, required: true }
});

//*Hide Password
userSchema.methods.hidePassword = (password) => {
    //*In this case, 10 times
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//*Compare Passowrd
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("user", userSchema);

