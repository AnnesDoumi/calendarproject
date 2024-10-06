document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            processImage(evt.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function processImage(imageData) {
    window.Tesseract.recognize(
        imageData,
        'deu', // oder 'eng' für Englisch
        {
            logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
        document.getElementById('output').textContent = text;
    }).catch(e => console.error(e));
}
