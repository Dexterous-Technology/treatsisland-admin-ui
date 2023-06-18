import axios from "axios";

const MediaUploader = {
  uploadToCloudinary: async (file) => {
    const url = "https://api.cloudinary.com/v1_1/dyfzooy3n/auto/upload";
    const preset = "wqav5eof";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(url, formData, config);
      return response.data.secure_url;
    } catch (error) {
      return "";
    }
  },
};

export default MediaUploader;
