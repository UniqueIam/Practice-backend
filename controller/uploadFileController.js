const uploadFileOnCloudinary = require("../service/cloudinary");

const uploadFile = async (req, res) => {
  try {
    // Ensure the file exists in the request
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const localFilePath = req.file.path; // Get the local file path
    console.log("Local file path:", localFilePath);

    // Upload the file to Cloudinary and get the URL
    const fileUrl = await uploadFileOnCloudinary(localFilePath);

    // Send the URL in the response
    return res.status(200).json({
      message: "File uploaded successfully",
      url: fileUrl, // Include the URL here
    });
  } catch (error) {
    console.error("Error uploading file:", error);

    // Send error response
    return res.status(500).json({
      message: "File upload failed",
      error: error.message,
    });
  }
};

module.exports = uploadFile;
