
document.getElementById('imageUpload').addEventListener('change', loadImage);

async function loadImage(event) {
    const file = event.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        const canva = document.getElementById('imageCanva');
        const ctx = canva.getContext('2d');
        canva.width = img.width;
        canva.height = img.height;
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(img.src);
    };
}

document.getElementById('denoiseButton').addEventListener('click', removeNoise);
document.getElementById('colorCorrectButton').addEventListener('click', correctColor);
document.getElementById('enhanceResolutionButton').addEventListener('click', enhanceResolution);

async function removeNoise() {
    const model = await tf.loadGraphModel('PATH_TO_YOUR_MODEL');
    const canva = document.getElementById('imageCanva');
    const ctx = canva.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canva.width, canva.height);
    const inputTensor = tf.browser.fromPixels(imageData).expandDims(0).toFloat().div(255);
    const outputTensor = model.predict(inputTensor).squeeze().mul(255).toInt();
    const outputImageData = new ImageData(new Uint8ClampedArray(await outputTensor.data()), canva.width, canva.height);
    ctx.putImageData(outputImageData, 0, 0);
}

async function correctColor() {
    const model = await tf.loadGraphModel('PATH_TO_YOUR_MODEL');
    const canva = document.getElementById('imageCanvas');
    const ctx = canva.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canva.width, canva.height);
    const inputTensor = tf.browser.fromPixels(imageData).expandDims(0).toFloat().div(255);
    const outputTensor = model.predict(inputTensor).squeeze().mul(255).toInt();
    const outputImageData = new ImageData(new Uint8ClampedArray(await outputTensor.data()), canva.width, canva.height);
    ctx.putImageData(outputImageData, 0, 0);
}

async function enhanceResolution() {
    const model = await tf.loadGraphModel('PATH_TO_YOUR_MODEL');
    const canva = document.getElementById('imageCanvas');
    const ctx = canva.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canva.width, canva.height);
    const inputTensor = tf.browser.fromPixels(imageData).expandDims(0).toFloat().div(255);
    const outputTensor = model.predict(inputTensor).squeeze().mul(255).toInt();
    const outputImageData = new ImageData(new Uint8ClampedArray(await outputTensor.data()), canva.width, canva.height);
    ctx.putImageData(outputImageData, 0, 0);
}
