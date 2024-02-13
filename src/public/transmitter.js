var canvas = document.querySelector('#preview');
var context = canvas.getContext('2d');
var btn = document.querySelector('#btn');
var video = document.querySelector('#video');
var socket = io();

canvas.width = 512;
canvas.height = 384;

context.width = canvas.width;
context.height = canvas.height;

function postMessage(msg) {
    document.querySelector('.status').innerText = msg;
}

function loadCamera(stream) {
    video.srcObject = stream;
    postMessage('Cámara funcionando');
}

function errorCamera() {
    postMessage('La cámara ha fallado');
}

function watchVideo(video, context) {
    context.drawImage(video, 0, 0, context.width, context.height);
    socket.emit('stream', canvas.toDataURL('image/webp'));
} 

btn.addEventListener('click', () => {
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msgGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, loadCamera, errorCamera);
    }

    var interval = setInterval(() => {
        watchVideo(video, context);
    }, 50);
});
