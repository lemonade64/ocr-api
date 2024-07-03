# Overview

Perception is an API route designed for Optical Character Recognition (OCR) from base64 encoded images. It integrates [**base64-to-image**](https://www.npmjs.com/package/base64-to-image) and [**tesseract.js**](https://www.npmjs.com/package/tesseract.js/v/2.1.1):

- [**base64-to-image**](https://www.npmjs.com/package/base64-to-image): decodes base64 image data into a file format recognisable by tesseract.js.
- [**tesseract.js**](https://www.npmjs.com/package/tesseract.js/v/2.1.1): utilises the Tesseract OCR engine to accurately extract text from images.

Perception simplifies the process of extracting text from images by combining these libraries, to provides a simple method for developers to integrate OCR functionality into their applications.

# Getting Started with Perception

Perception provides a simple way to extract text from images using tesseract.js.

Perception operates by receiving a POST request containing base64 data of the chosen image. The data is subsequently processed using tesseract.js to extract any textual content from the image. The results are then delivered to the user through the response body as a JSON object.

## Authentication

Currently, Perception does not require authentication. However, please ensure that your application securely handles both image data and API responses.

## Sending a POST Request

To extract text from an image, send a POST request to the Perception endpoint with the image data encoded in base64 format. Here’s an example using `node`:

```javascript
const axios = require("axios");

async function extractText(imageData) {
  try {
    const response = await axios.post(
      "https://perception-ocr.vercel.app/api/ocr",
      {
        imageData: imageData,
      }
    );
    console.info("Extracted Text:", response.data.text);
  } catch (e) {
    console.error("Error Extracting Text:", e.message);
  }
}

const base64ImageData = "...";
extractText(base64ImageData);
```

Replace `base64ImageData` with your base64 image data.

## Processing the Request

Upon receiving the POST request, Perception processes the image using tesseract.js to extract any text present. The extracted text is then returned in the response body as a JSON object.

## Handling the Response

The JSON response will contain the extracted text from the image. Here’s an example response:

```json
{
  "response": "Extracted Text."
}
```

## Error Handling

In case of errors, such as invalid image data or processing issues, Perception API will return an appropriate HTTP status code along with an error message in the response body.
