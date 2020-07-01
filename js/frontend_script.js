// Frontend
// Loader
var myVar;

function myFunction() {
	myVar = setTimeout(showPage, 3000);
};

function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("wrapper").style.display = "block";
};
// HTML5 Player
document.addEventListener('DOMContentLoaded', () => {
	const controls = [
		'play-large', // The large play button in the center
		'rewind', // Rewind by the seek time (default 10 seconds)
		'play', // Play/pause playback
		'fast-forward', // Fast forward by the seek time (default 10 seconds)
		'progress', // The progress bar and scrubber for playback and buffering
		'current-time',
		'mute', // Toggle mute
		'volume', // Volume control
		'settings', // Settings menu
		'pip', // Picture-in-picture (currently Safari only)
		'airplay', // Airplay (currently Safari only)
		'fullscreen', // Toggle fullscreen
	];
	const keyboard = {
		focused: true,
		global: false
	};
	const settings = ['captions', 'quality', 'speed', 'loop'];

	const player = Plyr.setup('.player', {
		controls,
		keyboard,
		settings,
	});
});
// Inspect
// document.onkeydown = function (e) {
// 	if (event.keyCode == 123) {
// 		return false;
// 	}
// 	if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
// 		return false;
// 	}
// 	if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
// 		return false;
// 	}
// 	if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
// 		return false;
// 	}
// 	if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
// 		return false;
// 	}
// };
function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}
$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});
// SweetAlert2
const flashSuccess = $('.flash-success').data('flashdata')
if (flashSuccess) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 13000,
		timerProgressBar: false,
		onOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	Toast.fire({
		icon: 'success',
		title: flashSuccess
	})
};
