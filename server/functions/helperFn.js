const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("../secrets")
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' }

    //if incorrect email
    if (err.message == "incorrect email") {
        errors.email = "that emails is not registerd"
    }
    //incorrect password
    if (err.message == "incorrect password") {
        errors.password = "that password is not correct"
    }
    //duplicate error
    if (err.code === 11000) {

        errors.email = "that email is already registered "
        return errors
    }
    //validation errors
    if (err.message.includes("demoUser validation failed")) {
        //loop through error object using Object.Values 
        // console.log(err.message);
        Object.values(err.errors).forEach(({ properties }) => {

            errors[properties.path] = properties.message
        })
    }
    return errors
}
async function protectedRoute(req, res, next) {
    try {
        let decryptedToken = await jwt.verify(req.cookies.login, JWT_KEY)
        console.log();
        if (decryptedToken) {
            let userId = decryptedToken.id
            req.userId = userId
            console.log("user id in req", req.userId);
            next()
        } else {
            res.status(404).json({ userData: req.user, message: "please login first" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { handleErrors, createToken, protectedRoute }


const maxAge = 60 * 60 * 24 * 3
function createToken(id) {
    return jwt.sign({ id }, JWT_KEY, { expiresIn: maxAge * 1000 })
}