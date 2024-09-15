import React, { useState } from "react";
import axios from "axios";

interface UploadResponse {
  optimized_description: string;
}

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedImage || !title || !description) {
      alert("Please provide an image, title, and description");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post<UploadResponse>("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Optimized Description:", response.data.optimized_description);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="uploader-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <textarea
          placeholder="Enter a description of product materials"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}

export default ImageUploader;
