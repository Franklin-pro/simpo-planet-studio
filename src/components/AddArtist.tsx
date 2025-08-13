import { useState } from "react";
import axios from "axios";
import { Plus, Upload, X } from "lucide-react";
import type { ChangeEvent, FormEvent } from 'react';

export default function AddArtistx() {
type ArtistForm = {
  name: string;
  bio: string;
  age: string;
  management: string;
  imageFile: File | null;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
};


const [formData, setFormData] = useState<ArtistForm>({
  name: '',
  bio: '',
  age: '',
  management: '',
  imageFile: null,
  socialLinks: {
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    tiktok: '',
  },
});


  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (["facebook", "instagram", "twitter", "youtube", "tiktok"].includes(name)) {
      setFormData(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    setFormData(prev => ({ ...prev, imageFile: file }));
  }
};



  const removeImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null }));
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
        throw new Error("Artist image is required");
      }

      const imageUrl = await convertToBase64(formData.imageFile);

      const response = await axios.post(
        "https://simpo-planet-studio-bn.onrender.com/api/v1/artist/add",
        {
          name: formData.name,
          bio: formData.bio,
          age: formData.age,
          management: formData.management,
          imageUrl,
          socialLinks: formData.socialLinks,
        }
      );

      setMessage({ text: response.data.message, type: "success" });
      // Reset form after successful submission
      setFormData({
        name: "",
        bio: "",
        age: "",
        management: "",
        imageFile: null,
        socialLinks: {
          facebook: "",
          instagram: "",
          twitter: "",
          youtube: "",
          tiktok: ""
        },
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
        <h2 className="text-3xl font-bold text-gray-800">Add New Artist</h2>
        <p className="text-gray-600 mt-2">Fill in the details below to add a new artist to your platform</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Artist Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter age"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Management</label>
              <input
                type="text"
                name="management"
                value={formData.management}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter management company"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Artist Image*</label>
            {!formData.imageFile ? (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (Max. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
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
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Biography */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Biography*</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Tell us about the artist..."
          />
        </div>

        {/* Social Links */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Social Media Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  fb.com/
                </span>
                <input
                  type="text"
                  name="facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block border w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="facebook link"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  instagram.com/
                </span>
                <input
                  type="text"
                  name="instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block border w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="instagram link"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  twitter.com/
                </span>
                <input
                  type="text"
                  name="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full border px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="twitter link"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  youtube.com/
                </span>
                <input
                  type="text"
                  name="youtube"
                  value={formData.socialLinks.youtube}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full border px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="channel"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border rounded-l-md border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  tiktok.com/
                </span>
                <input
                  type="text"
                  name="tiktok"
                  value={formData.socialLinks.tiktok}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full border px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="titok link"
                />
              </div>
            </div>
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
                Processing...
              </>
            ) : (
              <>
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Add Artist
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}