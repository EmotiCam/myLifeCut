import axios from "axios";
import { baseURL, apiKey } from "./config";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": apiKey
  }
});

//
const analyzeEmotion = image => {
  return instance.post(
    "/face/v1.0/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
    {
      url: image
    }
  );
};

const saveImageCloudinary = image => {
  console.log("save cloudinary");
  return axios.post("https://api.cloudinary.com/v1_1/googit/image/upload", {
    file: `data:image/jpg;base64,${image}`,
    upload_preset: "uyjph2ft"
  });
};

export default { analyzeEmotion, saveImageCloudinary };
