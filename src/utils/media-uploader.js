import axios from "axios";

const MediaUploader = {
  uploadImage: async (file) => {
    const url = "https://api.cloudinary.com/v1_1/dyfzooy3n/auto/upload";
    const s3_uploader_url = `${process.env.REACT_APP_API_BASE_URL}/upload`;
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
      const response = await axios.post(s3_uploader_url, formData, config);
      return response.data.fileUrl;
    } catch (error) {
      return "";
    }
  },
};

export default MediaUploader;
