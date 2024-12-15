const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

dotenv.config();
// Configuration
cloudinary.config({ 
 cloud_name: process.env.cloud_name, 
 api_key: process.env.api_key, 
 api_secret: process.env.api_secret
});


const uploadFileOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path is missing");
    }

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully to Cloudinary:", response);

    // Extract secure_url
    const fileUrl = response.secure_url;

    // Delete the local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return fileUrl; // Return the URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    // Clean up local file if upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    throw error; // Re-throw the error to be handled by the caller
  }
};

module.exports = uploadFileOnCloudinary;
