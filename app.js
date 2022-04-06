navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");

video.height = "1280";

const context = canvas.getContext("webgl2");

let model;

handTrack.load().then(lmodel => {
	model = lmodel;
});

function startVideo(params) {
	handTrack.startVideo(video).then(status => {
		if (status) {
			navigator.mediaDevices.getUserMedia(
				{ video: {} },
				stream => {
					video.srcObject = stream;
					console.log("stream working");
				},
				err => {
					console.log(err);
				}
			);
		}
	});
}

function runDetection() {
	model.detect(video).then(predictions => {
		console.log(predictions);
	});
}

startVideo();
runDetection();
