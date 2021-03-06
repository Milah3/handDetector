navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");

const modelParams = {
	flipHorizontal: true, // flip e.g for video
	maxNumBoxes: 20, // maximum number of boxes to detect
	iouThreshold: 0.5, // ioU threshold for non-max suppression
	scoreThreshold: 0.6 // confidence threshold for predictions.
};

let model;

function __init() {
	handTrack.load().then(lmodel => {
		model = lmodel;
		console.log("Model", model);
	});
}

function startVideo() {
	handTrack.startVideo(video).then(status => {
		if (status) {
			navigator.mediaDevices.getUserMedia(
				{ video: {} },
				stream => {
					video.srcObject = stream;
					// setInterval(runDetection, 1000);
					// runDetection();
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
		model.renderPredictions(predictions, canvas, context, video);
		if (predictions.length > 0) {
			audio.play();
		}
		// requestAnimationFrame(runDetection);
	});
}

// __init();
startVideo();
