import { width } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Buffer } from "buffer"
import "./Selfie.css"
export default function Selfie({ setClickImage, photoRef, selectedUser, socket }) {
    const videoRef = useRef(null)
    const [capture, setCapture] = useState(false)
    const user = useSelector(state => state.auth.currUser)
    const getUserCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                let video = videoRef.current
                video.srcObject = stream
                video.play()
            }).catch(err => {
                console.log(err);
            })
    }
    const sendImage = () => {
        let canvas = document.querySelector('canvas')
        let image = canvas.toDataURL("image/jpeg", 0.5);
        let filename = Math.random().toString(36).substring(2, 7) + ".jpg"
        let blob = dataURLtoFile(image, filename)
        console.log(blob);
        socket.emit("sendImagePrivate", { content: blob, to: selectedUser, type: "image", from: user, name: filename, mimetype: "image/jpeg" })
        setClickImage(false)
    }
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    useEffect(() => {
        getUserCamera()
    }, [videoRef])
    function takePicture() {
        let width = 500
        let height = width / (16 / 9)
        let photo = photoRef.current
        let video = videoRef.current

        photo.width = width;
        photo.height = height
        let ctx = photo.getContext('2d')
        ctx.drawImage(video, 0, 0, photo.width, photo.height)

    }
    return (
        <div className='selfieContainer'>

            <video className='videoContainer' ref={videoRef}>
            </video>

            <canvas ref={photoRef}></canvas>
            {capture && <button className="btn sendCaptureImage" onClick={sendImage}>send</button>}
            <button className='btn captureBtn' onClick={() => {

                setCapture(true)
                takePicture()
            }}>c</button>
            <button className='btn closeCapture' onClick={() => {
                videoRef.current.srcObject = null
                setClickImage(false)
            }} >X</button>
        </div >
    )
}
