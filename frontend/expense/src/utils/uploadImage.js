
import axiosInstance from './axiosInstance';
import { API_PATHS } from './apiPaths';


const uploadImage = async (imageFile) => {
  try {
    const formData = new FormData();
    // Append image file to form data
    formData.append("image", imageFile);

    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data; // Return response data
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};

export default uploadImage;


