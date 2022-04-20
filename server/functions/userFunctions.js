const userModel = require("../database/userModel")
const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("../secrets")
const multer = require("multer")
const { handleErrors, createToken } = require("./helperFn")
const path = require("path")
const { log } = require("console")
const Blob = require("node-blob")
const moment = require("moment")
const { findByIdAndUpdate } = require("../database/userModel")
async function login(req, res) {
    const { email, password } = req.body
    try {
        console.log("request body", req.body);
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        await userModel.findByIdAndUpdate(user._id, { token: token })
        console.log("user", user);
        res.status(200).json({ user, message: "successfully login", token })

    } catch (err) {
        console.log("error in login => ", err.message);
        const errors = handleErrors(err)
        res.json({ user: null, errors })
    }
}


async function signUp(req, res) {
    try {


        console.log("signup", req.body);
        let checkEmail = await userModel.findOne({ email: req.body.email })
        console.log(checkEmail);
        if (checkEmail == null) {
            const obj = { username: req.body.name, name: req.body.name, seen: "", password: req.body.password, status: req.body.status, email: req.body.email, profile: null }

            if (req.file) {
                let fileLocation = path.resolve(__dirname, "../files/profiles" + req.file.filename)
                console.log("filelocati", fileLocation);

                obj.profile = req.file.filename
            }
            console.log('file -- ', req.file.filename);
            const user = await userModel.create(obj)

            const token = createToken(user._id)
            await userModel.findByIdAndUpdate(user._id, {
                token: token
            })
            res.status(200).json({ user, token })

        } else {
            res.json({ user: null })
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ user: null, message: err.message })
    }
}

async function updateUser(req, res, next) {
    try {
        console.log(req.body);
        await userModel.findOneAndUpdate({ email: req.body.email },
            { firstName: req.body.firstName, lastName: req.body.lastName, address: req.body.address }, { new: true })
        let user = await userModel.findOne({ email: req.body.email })
        console.log("user details", user);
        return res.status(200).json({ user, })

    } catch (err) {
        return res.status(500).json({ user: null, message: err.message })
    }
}
async function getUser(req, res) {
    try {
        // let { token } = req.body
        // console.log(token);
        // let tokenID = await jwt.verify(token, JWT_KEY)
        // const user = await userModel.findOne({ _id: tokenID.id, token })

        res.status(200).json({ user })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ user: err.message })
    }
}
async function getProfilePhoto(req, res) {
    try {
        const { id } = req.params
        console.log(id);
        res.sendFile(id, { root: path.join(__dirname, "../files/profiles") })
    } catch (Err) {
        console.log(Err);
        res.status(500).json({ user: null })
    }
}
async function getUserDetails(req, res) {
    try {

        const { id } = req.params
        const userDetails = await userModel.findById(id)
        const user = { id: id, name: userDetails.name, username: userDetails.username, email: userDetails.email, status: userDetails.status, profile: userDetails.profile }
        console.log("getUser fetails ", user);
        res.status(200).json({ user: user })
    } catch (error) {
        res.status(500).json({ user: null })
    }

}
async function signoff(id) {
    try {
        console.log(id);
        await userModel.findByIdAndUpdate(id, { seen: moment().format(" h:mm a") })
        console.log("signoff time", obj);
    } catch (err) {
        console.log(err.message);
    }
}
async function getOtherUsers(req, res) {
    try {

    } catch (error) {

    }
}
module.exports = { login, signUp, getUser, getUserDetails, updateUser, getProfilePhoto, signoff }