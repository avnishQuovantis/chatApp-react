const http = require("http")
const express = require("express")
const cors = require("cors")
const { JWT_KEY } = require("./secrets")
const cookieParser = require("cookie-parser")
const socketIO = require("socket.io")

const { userJoin,
    getCurrentUser,
    userLeave, getUsersOnline,
    getRoomUsers,
} = require("./utils/users")
const { login, signUp, getUser, updateUser } = require("./functions/userFunctions")
const { getChats, saveChats, getChat } = require("./functions/itemFunctions")
const { log } = require("console")
const port = 4500 || process.env.port

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.post("/login", login)
app.post("/signup", signUp)
app.get("/chats", getChats)
//pass app to http.create server to create server
const server = http.createServer(app)


//initialize socket by passing server
const io = socketIO(server)

// app.pos
io.on("connection", (socket) => {

    socket.on("join", ({ userr }) => {
        const { email, username, id, name } = userr

        const user = userJoin(id, socket.id, username, email, name)
        socket.emit("welcome", { from: "admin", message: "Welcome to chat", user: user })
        io.emit("userJoined", { message: "user has joined", user: user, currentUsers: getUsersOnline() })

        socket.on("sendPrivateMessage", async ({ content, to, userid, from }) => {
            console.log("private message ",);
            const getUser = getCurrentUser(to.id)
            let message = await saveChats(from, to, content)
            console.log(message);
            io.to(to.socketId).to(socket.id).emit("privateMessage", { from: user, message: message, to: getUser })
        })
        socket.on("userChat", async ({ user, to }) => {
            console.log(user);
            let getUserChat = await getChat(user.id, to.id)
            console.log("getUserChat", getUserChat);
            socket.emit("getUserChat", { to: to, chat: getUserChat })
        })


        socket.on('disconnect', () => {
            userLeave(socket.id)
            socket.broadcast.emit('leave', { user: "Admin", users: getUsersOnline(), message: `  has left` });
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