const pdfParse = require('pdf-parse');
const sharp = require('sharp');

const processPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return {
      text: data.text,
      info: {
        pages: data.numpages,
        metadata: data.info
      }
    };
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw new Error('Failed to process PDF file');
  }
};

const processImage = async (buffer) => {
  try {
    // Resize image to reasonable dimensions and convert to JPEG
    const processedImage = await sharp(buffer)
      .resize(800, 800, { // Maximum dimensions
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toBuffer();

    // Convert to Base64
    return `data:image/jpeg;base64,${processedImage.toString('base64')}`;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image file');
  }
};

module.exports = { processPDF, processImage };