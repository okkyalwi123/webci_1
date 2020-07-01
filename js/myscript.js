// Sweetalert
const flashSuccess = $('.flash-success').data('flashdata')
const flashFailed = $('.flash-failed').data('flashdata')
const flashUpdate = $('.flash-update').data('flashdata')
const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
});
if (flashSuccess) {
	Toast.fire({
		icon: 'success',
		title: flashSuccess
	})
} else if (flashFailed) {
	Toast.fire({
		icon: 'error',
		title: flashFailed
	})
} else if (flashUpdate) {
	Toast.fire({
		icon: 'info',
		title: flashUpdate + ' Updated!'
	})
}
// Delete 1 Row
$('.delete').on('click', function (e) {
	e.preventDefault()
	const href = $(this).attr('href')
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!',
	}).then((result) => {
		if (result.value) {
			document.location.href = href
		}
	})
})

// Video Preview and thumb download
//canvas
var _CANVAS = document.querySelector('#video-canvas'),
	_CTX = _CANVAS.getContext('2d'),
	_VIDEO = document.querySelector('#main-video')

// When user chooses a MP4 file
document
	.querySelector('#file-to-upload')
	.addEventListener('change', function () {
		// Validate whether MP4
		if (
			['video/mp4'].indexOf(
				document.querySelector('#file-to-upload').files[0].type,
			) == -1
		) {
			alert('Error : Only MP4 format allowed')
			return
		}

		// Object Url as the video source
		document
			.querySelector('#main-video source')
			.setAttribute(
				'src',
				URL.createObjectURL(document.querySelector('#file-to-upload').files[0]),
			)

		// Load the video and show it
		_VIDEO.load()
		_VIDEO.style.display = 'inline'

		// Load metadata of the video to get video duration and dimensions
		_VIDEO.addEventListener('loadedmetadata', function () {
			console.log(_VIDEO.duration)
			var video_duration = _VIDEO.duration,
				duration_options_html = ''

			// Set options in dropdown at 4 second interval
			for (var i = 0; i < Math.floor(video_duration); i = i + 4) {
				duration_options_html += '<option value="' + i + '">' + i + '</option>'
			}
			document.querySelector(
				'#set-video-seconds',
			).innerHTML = duration_options_html

			// Show the dropdown container
			document.querySelector('#thumbnail-container').style.display = 'block'

			// Set canvas dimensions same as video dimensions
			_CANVAS.width = _VIDEO.videoWidth
			_CANVAS.height = _VIDEO.videoHeight
		})
	})

// On changing the duration dropdown, seek the video to that duration
document
	.querySelector('#set-video-seconds')
	.addEventListener('change', function () {
		_VIDEO.currentTime = document.querySelector('#set-video-seconds').value

		// Seeking might take a few milliseconds, so disable the dropdown and hide download link
		document.querySelector('#set-video-seconds').disabled = true
		document.querySelector('#get-thumbnail').style.display = 'none'
	})

// Seeking video to the specified duration is complete
document
	.querySelector('#main-video')
	.addEventListener('timeupdate', function () {
		// Re-enable the dropdown and show the Download link
		document.querySelector('#set-video-seconds').disabled = false
		document.querySelector('#get-thumbnail').style.display = 'inline'
	})

// On clicking the Download button set the video in the canvas and download the base-64 encoded image data
document.querySelector('#get-thumbnail').addEventListener('click', function () {
	_CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight)

	document
		.querySelector('#get-thumbnail')
		.setAttribute('href', _CANVAS.toDataURL())
	document
		.querySelector('#get-thumbnail')
		.setAttribute('download', 'thumbnail.png')
})

// Copied Code
function copy(copyId) {
	var $inp = $('<input>')
	$('body').append($inp)
	$inp.val($('' + copyId).text()).select()
	document.execCommand('copy')
	$inp.remove()
	$('.alert11').fadeIn(20, function () {
		$('.alert11').fadeOut()
	})
}

$(document).ready(function () {

	// Copied Code
	$('#copyButton1').click(function () {
		copy('#text1')
	})
	$('#copyButton2').click(function () {
		copy('#text2')
	})

	// Progress Bar
	var getUrl = window.location;
	var baseUrl = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
	$('#upload_form').submit(function (e) {
		if ($('.videos').val() != '' || $('.thumb').val() != '') {
			e.preventDefault()
			$(this).ajaxSubmit({
				beforeSubmit: function () {
					$('#progress-bar').width('0%')
					$('.progress-showhide').show()
				},
				uploadProgress: function (event, position, total, percentageComplete) {
					$('#progress-bar').width(percentageComplete + '%')
					$('#progress-bar').html(
						"<label style='color:#fff;'>" + percentageComplete + '%</label>',
					)
				},
				success: function () {
					window.location.replace(baseUrl + '/backend/post');
				},
				resetForm: true,
			})
			return false
		}
	});

	// dropify
	$('.dropify').dropify({
		messages: {
			default: 'Drag atau drop untuk memilih gambar',
			replace: 'Ganti',
			remove: 'Hapus',
			error: 'error',
		},
	});
})

// Dropzone Custom
// Dropzone.js
const fileVideo = document.getElementById('file-to-upload')
const customBtn = document.getElementById('custom-button')
const customTxt = document.getElementById('custom-text')

// Video Dropzone
customBtn.addEventListener('click', function () {
	fileVideo.click()
})

fileVideo.addEventListener('change', function () {
	if ((fileImg.value, fileVideo.value)) {
		customTxt.innerHTML = fileVideo.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]
	} else {
		customTxt.innerHTML = 'No file chosen, yet.'
	}
})

// Duration
var myVideoPlayer = document.getElementById('main-video')

myVideoPlayer.addEventListener('loadedmetadata', function () {
	var duration = myVideoPlayer.duration
	$('.dur').html(
		'<input type="hidden" name="dur" value="' + duration.toFixed(0) + '" >',
	)
});
