let fontArrayBuffer = null;

document.getElementById('fontFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fontArrayBuffer = e.target.result;
        };
        reader.readAsArrayBuffer(file);
    }
});

document.getElementById('applyButton').addEventListener('click', function() {
    if (fontArrayBuffer) {
        const fontBlob = new Blob([fontArrayBuffer], { type: 'font/ttf' });
        const fontUrl = URL.createObjectURL(fontBlob);

        const newFontFace = new FontFace('uploadedFont', `url(${fontUrl})`);
        newFontFace.load().then(function(loadedFace) {
            document.fonts.add(loadedFace);

            // Aplicar a fonte aos elementos que contêm letras maiúsculas e minúsculas
            document.getElementById('fontSample').style.fontFamily = 'uploadedFont';
            document.getElementById('alphabetSample').style.fontFamily = 'uploadedFont';
            document.getElementById('lowercaseAlphabetSample').style.fontFamily = 'uploadedFont';
            document.getElementById('symbolSample').style.fontFamily = 'uploadedFont';
            document.getElementById('numberSample').style.fontFamily = 'uploadedFont';
        }).catch(function(error) {
            console.error('Font loading failed:', error);
        });
    } else {
        alert('Por favor, selecione um arquivo de fonte primeiro.');
    }
});
