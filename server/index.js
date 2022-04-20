const http = require("http")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const socketIO = require("socket.io")
const bodyParser = require("body-parser")
const multer = require("multer")
const path = require("path")

const { userJoin,
    getCurrentUser,
    userLeave, getUsersOnline,
    getRoomUsers,
    getCurrentUserBySocketId,
} = require("./utils/users")
const storeImage = require("./functions/storeImage")
const { login, signUp, getUser, updateUser, getProfilePhoto, signoff, getUserDetails } = require("./functions/userFunctions")
const { getChats, saveChats, getChat, getChatImage, getAllUsers, searchUser } = require("./functions/itemFunctions")
const port = 4500 || process.env.port

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'files')))
app.use(express.json())

app.post("/login", login)
const storage = multer.diskStorage({
    destination: "./files/profiles",
    filename: function (req, file, cb) {
        console.log("inside distorage ", file);
        cb(null, Math.random().toString(16).slice(2) + path.extname(file.originalname));
    }
});
const upload = multer({

    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file.mimetype);
        if (file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            cb(null, true)
        } else {
            console.log("");
            cb(null, false)
        }
    },
    limits: { fileSize: 1000000 },
})




app.post("/signup", upload.single("image"), signUp)

app.get("/chats", getChats)
app.get("/profile/dp/:id", getProfilePhoto)
app.get("/userprofile/:id", getUserDetails)
app.get("/posts/images/:id", getChatImage)
app.get("/user/:id", searchUser)
// app.get("/users", getAllUsers)

//pass app to http.create server to create server
const server = http.createServer(app)


//initialize socket by passing server
const io = socketIO(server)

// app.pos
io.on("connection", (socket) => {

    socket.on("join", async ({ userr }) => {
        const { email, username, id, name, profile } = userr

        const user = userJoin(id, socket.id, username, email, name, profile)
        const allUsers = await getAllUsers()
        console.log(" all users ", allUsers);
        socket.emit("welcome", { from: "admin", message: "Welcome to chat", user: user, users: allUsers })
        io.emit("userJoined", { message: "user has joined", user: user, currentUsers: getUsersOnline() })

        socket.on("sendPrivateMessage", async ({ content, to, from, type }) => {
            console.log("private message ",);
            const getUser = getCurrentUser(to.id)
            let message = await saveChats(from, to, content, type, null)
            console.log(message);
            io.to(to.socketId).to(socket.id).emit("privateMessage", { from: user, message: message, to: getUser })
        })

        socket.on("sendImagePrivate", async ({ content, to, from, type, mimetype, name }) => {
            console.log("inside sendImagePrivate", content);
            const filename = await storeImage(from, to, content, mimetype, name)
            console.log("filename -" + filename);
            const getUser = getCurrentUser(to.id)
            let message = await saveChats(from, to, filename, type, mimetype)
            console.log("sendImageMessagee " + message);
            io.to(to.socketId).to(socket.id).emit("privateMessage", { from: user, message: message, to: getUser })
        })
        socket.on("userChat", async ({ user, to }) => {
            console.log(user);
            let { getUserChat, lastSeen } = await getChat(user.id, to.id)
            console.log("getUserChat", getUserChat);
            socket.emit("getUserChat", { to: to, chat: getUserChat, lastSeen: lastSeen.seen })
        })


        socket.on('disconnect', async () => {

            let { user, lastSeen } = await userLeave(socket.id)
            socket.broadcast.emit('leave', { user, users: getUsersOnline(), message: `${user.username}  has left`, lastSeen: lastSeen });
            console.log(`user left`);
        })
    })
})
server.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
})







/*socket.on("joinRoom", ({ username, room, }) => {
            socket.to(user.room).emit("welcome", { user: "admin", message: "welcome to chat group" })
            currentUsers = getRoomUsers(room)
            console.log(currentUsers);
            socket.join(user.room)
            socket.broadcast.to(user.room).emit("userJoined", { message: "user has joindd", user, currentUsers: currentUsers })
            console.log("connected to port");

            socket.on("chatMessage", ({ message, id, room }) => {
                let user = getCurrentUser(id)
                console.log(message);
                io.to(room).emit("sendMessage", { user: user, message, id })
            })

            socket.on("disconnectRoom", (data) => {
                console.log("disconnect");
                let user = userLeave(socket.id)


                io.to(data.room).emit("leave", { users: getRoomUsers(user.room), user: { user }, message: `user has left the chat` })
            })
        }) */