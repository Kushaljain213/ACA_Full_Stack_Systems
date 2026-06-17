const {Jimp} = require('jimp');
const jsQR = require('jsqr');

const decodeQR = async (imagePath) => {
  try {
    const image = await Jimp.read(imagePath);
    const {data,width,height} = image.bitmap;
    const qr = jsQR(data, width, height);
    if (qr) {
        console.log('QR code found:', qr.data);
        return qr.data;
    }
    else{
        throw new Error('No QR code found');
    }
  } catch (error) {
    console.error('Error decoding QR code:', error);
    return null;
  }
};

if(require.main === module) {
    decodeQR('./img.png');
}
module.exports = {decodeQR};