(function(){
    var fileInput = document.getElementById('file');
    var pictures = [];
    var picturesContainer = document.querySelector('.pictures');
    var slideshow = document.querySelector('#slideshow img');
    var currentIndex = 0;
    var socket = io('http://' + window.location.hostname + ':3000');
    var playing = false;
    var fullsreenBtn = document.getElementById('fullscreen-btn');
    var counter = document.getElementById('counter');

    fileInput.addEventListener('change', function(){
        upload(fileInput.files[0]);
    });

    listPictures();

    socket.on('upload', function(event){
        pictures.push(event.path);
        appendPreview(event.path);
        if(!playing) {
            initLoop();
        }
    });

    fullsreenBtn.addEventListener('click', function(){
        if(slideshow.requestFullscreen) {
            slideshow.requestFullscreen();
        } else if(slideshow.mozRequestFullScreen) {
            slideshow.mozRequestFullScreen();
        } else if(slideshow.webkitRequestFullscreen) {
            slideshow.webkitRequestFullscreen();
        } else if(slideshow.msRequestFullscreen) {
            slideshow.msRequestFullscreen();
        }
    });

    function initLoop() {
        playing = true;
        iterate();
        slideshow.onload = function() {
            setTimeout(iterate, 5000);
        }
    }

    function iterate() {
        slideshow.src = window.location.origin + '/uploads/' + pictures[currentIndex].replace(/_thumb/, '');

        currentIndex = currentIndex + 1;
        counter.innerHTML = currentIndex + ' / ' + pictures.length;

        if(currentIndex == pictures.length) {
            currentIndex = 0;
        }
    }

    function listPictures() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://' + window.location.hostname + ':3000/uploads');
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                pictures = JSON.parse(xhr.responseText);
                if(pictures.length > 0) {
                    loadPreviews(pictures);
                    initLoop();
                }
            }
        }
    }

    function loadPreviews(pictures) {
        pictures.forEach(function(picture){
           appendPreview(picture);
        });
    }

    function appendPreview(picture) {
        var img = document.createElement('img');
        img.src = window.location.origin + '/uploads/' + picture;

        picturesContainer.appendChild(img);
    }

    function upload(file) {
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open('POST', 'http://' + window.location.hostname + ':3000/uploads', true);

        formData.append('picture', file);
        xhr.send(formData);

        xhr.onreadystatechange = function() {
            if (xhr.status === XMLHttpRequest.DONE) {
                // TODO handle upload success
            }
        }
    }
})();
