const http = require("http")
const express = require("express")
const cors = require("cors")
const socketIO = require("socket.io")
const { userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers } = require("./utils/users")
const { log, group } = require("console")

const port = 4500 || process.env.port

const app = express()
app.use(cors())


app.get("/", (req, res) => {
    res.send("Hell it is")
})
//pass app to http.create server to create server
const server = http.createServer(app)
// let currentUsers = [/]
//initialiez zsocket io bhy passing server
const io = socketIO(server)

io.on("connection", (socket) => {

    socket.on("joinRoom", ({ username, room, }) => {
        const user = userJoin(socket.id, username, room)
        currentUsers = getRoomUsers(room)
        socket.emit("welcome", { user: "admin", message: "Welcome to chat", currentUsers: currentUsers })
        console.log(currentUsers);
        socket.join(user.room)
        socket.to(user.room).emit("welcome", { user: "admin", message: "welcome to chat group", currentUsers: currentUsers })
        socket.broadcast.to(user.room).emit("userJoined", { message: "user has joindd", user, currentUsers: currentUsers })
        console.log("connected to port");

        socket.on("chatMessage", ({ message, id, room }) => {
            let user = getCurrentUser(id)
            console.log(message);
            io.to(room).emit("sendMessage", { user: user, message, id })
        })

    })
    socket.on("disconnect", (data) => {
        console.log("disconnect");
        let user = userLeave(socket.id)
        io.to(user.room).emit("leave", { users: getRoomUsers(user.room), user: { user }, message: `user has left the chat` })

    })



})
server.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
})