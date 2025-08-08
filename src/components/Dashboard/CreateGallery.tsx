import { useState } from "react";
import axios from "axios";
import { Plus, X, Image, Video } from "lucide-react";
import type { ChangeEvent, FormEvent } from 'react';

type FormDataState = {
  title: string;
  description: string;
  imageFile: File | null;
  videoFile: File | null;
};

type MessageState = {
  text: string;
  type: "success" | "error" | "";
};

export default function CreateGallery() {
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    description: "",
    imageFile: null,
    videoFile: null,
  });

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<MessageState>({ text: "", type: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const removeFile = (type: keyof Pick<FormDataState, "imageFile" | "videoFile">) => {
    setFormData(prev => ({ ...prev, [type]: null }));
  };

  const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setMessage({ text: "", type: "" });

    try {
      if (!formData.imageFile) {
        throw new Error("Image is required");
      }

      const image = await convertToBase64(formData.imageFile);
      let videoUrl = "";

      if (formData.videoFile) {
        const videoBase64 = await convertToBase64(formData.videoFile);
        videoUrl = typeof videoBase64 === "string" ? videoBase64 : "";
      }

      const response = await axios.post("http://localhost:3000/api/v1/gallery/add-gallery", {
        title: formData.title,
        description: formData.description,
        image,
        videoUrl,
      });

      setMessage({ text: response.data.message, type: "success" });

      setFormData({
        title: "",
        description: "",
        imageFile: null,
        videoFile: null,
      });
    } catch (err: unknown) {
      let errorMessage = "Failed to create gallery";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setMessage({
        text: errorMessage,
        type: "error"
      });
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Create Gallery</h2>
        <p className="text-gray-600 mt-2">Upload images and videos to create a new gallery</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Title and Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Enter gallery title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="Describe your gallery..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Image*</label>
            {!formData.imageFile ? (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (Max. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    name="imageFile"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            ) : (
              <div className="relative w-full h-64">
                <img
                  src={URL.createObjectURL(formData.imageFile)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeFile("imageFile")}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Video (optional)</label>
            {!formData.videoFile ? (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Video className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">MP4, MOV (Max. 20MB)</p>
                  </div>
                  <input
                    type="file"
                    name="videoFile"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            ) : (
              <div className="relative w-full h-64 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                <div className="text-center p-4">
                  <Video className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700">{formData.videoFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile("videoFile")}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Remove video"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Create Gallery
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}