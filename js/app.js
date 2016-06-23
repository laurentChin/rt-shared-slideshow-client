(function(){
    var fileInput = document.getElementById('file');
    var pictures = [];
    var picturesContainer = document.querySelector('.pictures');

    fileInput.addEventListener('change', function(){
        upload(fileInput.files[0]);
    });

    listPictures();

    function listPictures() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://' + window.location.hostname + ':3000/uploads');
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                pictures = JSON.parse(xhr.responseText);
                loadPreviews(pictures);
            }
        }
    }

    function loadPreviews(pictures) {
        pictures.forEach(function(picture){
            var img = document.createElement('img');
            img.src = window.location.origin + '/uploads/' + picture;

            picturesContainer.appendChild(img);
        });
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
