const { log } = require("console");
const { get } = require("http");
const userModel = require("../database/userModel");
const formatMessage = require(".././utils/messages")
const { getUser } = require("./userFunctions");
const path = require("path");


async function getChats(req, res) {
    const { id } = req.body
    try {
        let userData = await userModel.findById(id)
        console.log("userr data ", cartItems.cart);
        res.status(200).json({ user: userData, status: 200, })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ user: null, status: 500 })
    }
}
async function saveChats(from, to, message, type, mimetype) {
    try {
        let getUser = await userModel.findById(from.id).select("chats")
        let chats = getUser["chats"]
        // console.log("inside save cahts", chats);
        let index = chats.findIndex(obj => obj.id == to.id)
        let messageContent = formatMessage(from.username, from.id, message, type, mimetype)
        if (index != -1) {
            chats[index]['seenCount']++
            chats[index]["messages"].push(messageContent)

            let aw = chats.filter((obj, i) => {
                return i !== index
            })
            aw.unshift(chats[index])
            chats = aw

        } else {
            chats.unshift({ id: to.id, username: to.username, profile: to.profile, messages: [messageContent], seenCount: 1 })

        }
        await userModel.findByIdAndUpdate(from.id, { chats: chats })

        let otherUser = await userModel.findById(to.id).select("chats")
        let otherChats = otherUser["chats"]
        let i = otherChats.findIndex(obj => obj.id == from.id)
        if (i != -1) {
            otherChats[i]['seenCount']++
            otherChats[i]["messages"].push(messageContent)
            let aw = otherChats.filter((obj, ind) => {
                return ind !== i
            })
            aw.unshift(otherChats[i])
            otherChats = aw
        } else {
            otherChats.unshift({ id: from.id, username: from.username, profile: from.profile, messages: [messageContent], seenCount: 1 })
            // i++
        }
        console.log('from chats', chats, 'to chats ', otherChats, 'chats ', 'from inde ', index, 'to index', i);
        await userModel.findByIdAndUpdate(to.id, { chats: otherChats })
        i = otherChats.findIndex(obj => obj.id == from.id)
        index = chats.findIndex(obj => obj.id == to.id)
        return { chatMessage: chats[index], otherMessage: otherChats[i], otherChats, chats }
    } catch (err) {
        console.log(err);
    }
}


async function getChat(user, to) {
    try {
        console.log("inside getChat user ", user);
        let getAllData = await userModel.findById(user).select("chats")
        let lastSeen = await userModel.findById(to).select("seen")
        // console.log("last  seen", lastSeen);
        // console.log("inside All Chats ", getAllData);
        let getUserChat = getAllData.chats.find(obj => obj.id == to)
        console.log("chat = ", getUserChat);
        let ll = []
        for (let i = 0; i < getAllData.chats.length; i++) {
            if (getAllData.chats[i].id == to) {
                ll.push({ ...getAllData.chats[i], seenCount: 0 })
            } else {
                ll.push(getAllData.chats[i])
            }
        }
        console.log('seen count in get chat', ll);
        if (getUserChat === undefined) {
            return []
        } else {
            return { getUserChat, lastSeen }
        }
    } catch (Err) { }
}
function getChatImage(req, res) {
    try {

        console.log("inside get image");
        const { id } = req.params
        let ob = id.split("__")
        console.log("getChatimage id -", ob[1], ob[0])
        res.sendFile(ob[1], { root: path.join(__dirname, "..", "files/posts/" + ob[0]) })
    } catch (err) {
        console.log(err);
        res.status(500).json({ user: null })
    }
}
async function getAllUsers() {
    try {
        let allUsers = []
        for await (let doc of userModel.find({}, { password: 0, chats: 0, groups: 0 })) {
            let obj = { name: doc.name, username: doc.username, status: doc.status, email: doc.email, id: doc._id, seen: doc.seen, profile: doc.profile }
            console.log("doc ", obj);

            allUsers.push(obj)
        }
        console.log("allUsers ,", allUsers);
        return allUsers
    } catch (err) {
        console.log();
    }
}
async function searchUser(req, res) {
    try {
        const { id } = req.params
        let user = await userModel.find({ name: { "$regex": id, "$options": "i" }, username: { "$regex": id, "$options": "i" } }, { password: 0, chats: 0, groups: 0 })
        console.log("search user ", user);
        res.status(200).json({ user: user, message: "user" })
    } catch (error) {
        res.status(500).json({ user: null, message: error.message })

    }
}
module.exports = { getChats, saveChats, getChat, getChatImage, getAllUsers, searchUser }