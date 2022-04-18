const fs = require('fs')
const path = require("path")

async function storeImage(from, to, content, mimetype, name) {


    const filename = Date.now() + "---" + name
    console.log("filename - ", filename);
    let foldername = ""
    if (fs.existsSync(path.join(__dirname, "..", "/files/posts/" + from.id + "-" + to.id))) {
        console.log("inside first if");
        foldername = from.id + "-" + to.id
    } else if (fs.existsSync(path.join(__dirname, "..", "/files/posts/" + to.id + "-" + from.id))) {
        console.log("inside second if");

        foldername = to.id + "-" + from.id
    } else {
        console.log("inside last if");

        foldername = from.id + "-" + to.id
        fs.mkdirSync(path.join(__dirname, "..", "files/posts/" + foldername), { recursive: true }, error => {
            console.log("inside mkdirSyncs");
            if (error) {
                console.log("error while creating folder");
            } else {
                console.log("created folder ");
            }
        })
    }
    console.log("folder name = ", foldername);
    let wholeDirectory = "files/posts/" + foldername + "/" + filename
    await fs.writeFile(path.join(__dirname, "..", wholeDirectory), content, 'binary', function (err) {
        if (err) {
            console.log("error wile creating file", err.message);
        }
        else {
            console.log('File saved.')
        }
    })




    return foldername + "__" + filename
}
module.exports = storeImage
