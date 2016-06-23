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
        };

        reader.readAsDataURL(file);
    }
})();
