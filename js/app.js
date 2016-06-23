(function(){
    var fileInput = document.getElementById('file');
    var previewContainer = document.getElementById('preview');

    fileInput.addEventListener('change', function(){
        preview(fileInput.files[0]);
    });

    function preview(file) {
        var reader = new FileReader();

        reader.onload = function(event) {
            previewContainer.src = event.target.result;
            upload(file);
        };

        reader.readAsDataURL(file);
    }

    function upload(file) {
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open('POST', 'http://' + window.location.hostname + ':3000/upload', true);

        formData.append('picture', file);
        xhr.send(formData);

        xhr.onreadystatechange = function() {
            if (xhr.status === XMLHttpRequest.DONE) {
                // TODO handle upload success
            }
        }
    }
})();
