import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { Upload, Music, Image, Link, Calendar, Clock, X } from 'lucide-react';

type FormDataState = {
  title: string;
  artist: string;
  album: string;
  genre: string;
  releaseDate: string;
  duration: string;
  coverImageUrl: File | null;
  youtubeLink: string;
};

type MessageState = {
  text: string;
  type: 'success' | 'error' | '';
};

function UploadMusic() {
  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseDate: '',
    duration: '',
    coverImageUrl: null,
    youtubeLink: '',
  });

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageState>({ text: '', type: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const removeFile = (field: keyof FormDataState) => {
    setFormData(prev => ({
      ...prev,
      [field]: null,
    }));
  };

  const formatDuration = (seconds: string | number) => {
    const numSeconds = Number(seconds);
    const mins = Math.floor(numSeconds / 60);
    const secs = numSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Convert file to base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setMessage({ text: '', type: '' });

    try {
      // Convert files to base64 if they exist
      const coverImageBase64 = formData.coverImageUrl ? await fileToBase64(formData.coverImageUrl) : null;

      // Create JSON payload
      const jsonPayload = {
        title: formData.title,
        artist: formData.artist,
        album: formData.album,
        genre: formData.genre,
        releaseDate: formData.releaseDate,
        duration: parseInt(formData.duration),
        youtubeLink: formData.youtubeLink,
        coverImageUrl: coverImageBase64,
        // Include file metadata
        coverImageName: formData.coverImageUrl?.name || null,
        coverImageSize: formData.coverImageUrl?.size || null,
      };

      const response = await fetch('http://localhost:3000/api/v1/music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

   await response.json();

      setMessage({ text: 'Music uploaded successfully!', type: 'success' });

      // Reset form
      setFormData({
        title: '',
        artist: '',
        album: '',
        genre: '',
        releaseDate: '',
        duration: '',
        coverImageUrl: null,
        youtubeLink: '',
      });
    } catch (error: unknown) {
      let errorMessage = 'Error uploading music';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessage({
        text: errorMessage,
        type: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Music className="w-8 h-8" /> Upload Music
        </h2>
        <p className="text-gray-600 mt-2">Share your music with the world</p>
      </div>
      
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 
          'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Song title"
                />
                <Music className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Artist*</label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Artist name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Album</label>
              <input
                type="text"
                name="album"
                value={formData.album}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Album name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select genre</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Electronic">Electronic</option>
                <option value="R&B">R&B</option>
                <option value="Jazz">Jazz</option>
                <option value="Classical">Classical</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Date and Duration */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Release Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (seconds)*</label>
              <div className="relative">
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Duration in seconds"
                />
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                {formData.duration && (
                  <span className="absolute right-3 top-2.5 text-sm text-gray-500">
                    {formatDuration(formData.duration)}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link</label>
              <div className="relative">
                <input
                  type="url"
                  name="youtubeLink"
                  value={formData.youtubeLink}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://youtube.com/..."
                />
                <Link className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="md:col-span-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
            {!formData.coverImageUrl ? (
              <div className="flex items-center justify-center w-full h-40">
                <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center p-5">
                    <Image className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500 text-center">
                      <span className="font-semibold">Click to upload</span><br />
                      <span className="text-xs">PNG, JPG (Max. 5MB)</span>
                    </p>
                  </div>
                  <input
                    type="file"
                    name="coverImageUrl"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="relative w-full h-40">
                <img
                  src={URL.createObjectURL(formData.coverImageUrl)}
                  alt="Cover preview"
                  className="w-full h-full object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeFile('coverImageUrl')}
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Remove cover image"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isUploading}
            className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="-ml-1 mr-2 h-5 w-5" />
                Upload Music
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadMusic;