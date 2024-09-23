import React, { useState, useRef } from "react";
import axios from "axios";

interface UploadResponse {
  optimized_description: string;
}
interface LoadingState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

function ImageUploader({ setIsLoading, isLoading }: LoadingState) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setIsLoading(true)

    if (!selectedImage || !title || !description) {
      alert("Please provide an image, title, and description");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post<UploadResponse>("http://127.0.0.1:8000/api/upload-image", formData);

      console.log("Optimized Description:", response.data.optimized_description);
      setSelectedImage(null);
      setTitle("");
      setDescription("");
      setIsLoading(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="product__uploader-wrap">
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
          ref={fileInputRef}
        />
        <textarea
          placeholder="Enter a description of product materials"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
            Loading
            <div className="spinner" />
            </>
          )
           : "Upload Product"}
        </button>
      </form>
    </div>
  );
}

export default ImageUploader;
