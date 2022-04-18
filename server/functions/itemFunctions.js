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
            chats[index]["messages"].push(messageContent)
        } else {
            chats.push({ id: to.id, username: to.username, profile: to.profile, messages: [messageContent] })
            index++
        }
        await userModel.findByIdAndUpdate(from.id, { chats: chats })

        let otherUser = await userModel.findById(to.id).select("chats")
        let otherChats = otherUser["chats"]
        // console.log("other user ave chats", otherChats);
        let i = otherChats.findIndex(obj => obj.id == from.id)
        if (i != -1) {
            otherChats[i]["messages"].push(messageContent)
        } else {
            otherChats.push({ id: from.id, username: from.username, profile: from.profile, messages: [messageContent] })
            i++
        }
        await userModel.findByIdAndUpdate(to.id, { chats: otherChats })

        return chats[index]
    } catch (err) {
        console.log(err);
    }
}


async function getChat(user, to) {
    try {
        console.log("inside getChat user ", user);
        let getAllData = await userModel.findById(user).select("chats")
        let lastSeen = await userModel.findById(to).select("seen")
        console.log("last  seen", lastSeen);
        console.log("inside All Chats ", getAllData);
        let getUserChat = getAllData.chats.find(obj => obj.id == to)
        console.log("chat = ", getUserChat);
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
module.exports = { getChats, saveChats, getChat, getChatImage }