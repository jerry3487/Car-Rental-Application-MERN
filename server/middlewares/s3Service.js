import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';

config();

// Mock S3 functions
class MockS3 {
  constructor() {
    // Mock S3 initialization
  }

  async upload(params) {
    // Mock upload function
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful upload (for demonstration purposes)
        resolve({ Location: `https://mock-s3-bucket.com/${params.Key}` });
      }, 1000);
    });
  }

  async deleteObjects(params) {
    // Mock delete function
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful deletion (for demonstration purposes)
        resolve({ Deleted: params.Delete.Objects });
      }, 1000);
    });
  }
}

const mockS3 = new MockS3();

export const s3Uploadv2 = async (files) => {
  const params = files.map((file) => ({
    Bucket: process.env.BUCKET_NAME,
    Key: `uploads/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
  }));

  return await Promise.all(params.map((param) => mockS3.upload(param)));
}

export const s3Delete = async (images) => {
  if (
    images &&
    images[0].startsWith(
      'https://renta-car-sif-2022.s3.eu-central-1.amazonaws.com/'
    )
  ) {
    const getKeys = images.map((image) => ({
      Key: image.split('/').slice(3).join('/'),
    }));

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Delete: {
        Objects: getKeys,
        Quiet: false,
      },
    };

    return await mockS3.deleteObjects(params);
  } else {
    console.log('nuk starton me https/bucketname');
    return null; // Or some default value/error handling
  }
}
