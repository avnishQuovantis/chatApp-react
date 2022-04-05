const mongoose = require("mongoose")
const { db_link } = require("../secrets")
const bcrypt = require("bcrypt")
const { isEmail } = require("validator")
mongoose.connect(db_link).then(db => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

//schem
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String,
    },

    password: {
        type: String,
        required: [true, "please enter a password"],
    },
    token: {
        type: String
    },
    chats: { type: Array },
    groups: { type: Array },
    profile: {
        type: String
    }
})

//save password in hashed form
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {
    console.log("inside login function");
    const user = await this.findOne({ email: email })
    console.log("inside userModel login function ", user);
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        console.log(auth);
        if (auth) {
            return user
        } else {
            throw Error("incorrect password")
        }
    } else {
        throw Error("incorrect email")
    }
}
let userModel = mongoose.model("chatusermodel", userSchema)
module.exports = userModel
// async function createData() {
//     let user = { name: "avnish", email: "avnish@gmail.com", password: "1234", confirmPassword: "1234" }
//     let result = await userModel.create(user)
//     console.log(result)
// }
// createData()