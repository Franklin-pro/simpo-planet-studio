import { useState } from 'react';
import { useForm } from 'react-hook-form';

function CreateProducer() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [socialMedia, setSocialMedia] = useState({
    instagram: '',
    twitter: '',
    facebook: '',
    spotify: '',
    soundCloud: ''
  });

  const onSubmit = (data) => {
    const producerData = {
      ...data,
      socialMedia
    };
    console.log(producerData);
    // Here you would typically send the data to your backend API
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setSocialMedia(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Producer</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Basic Information</h2>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Eve"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Level*</label>
            <select
              id="level"
              {...register("level", { required: "Level is required" })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select level</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Legendary">Legendary</option>
            </select>
            {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>}
          </div>
          
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              id="image"
              type="url"
              {...register("image")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio*</label>
            <textarea
              id="bio"
              {...register("bio", { required: "Bio is required" })}
              rows={3}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pop music specialist with multiple platinum records..."
            />
            {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Social Media Links</h2>
          
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              id="instagram"
              name="instagram"
              type="url"
              value={socialMedia.instagram}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://instagram.com/username"
            />
          </div>
          
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
            <input
              id="twitter"
              name="twitter"
              type="url"
              value={socialMedia.twitter}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://twitter.com/username"
            />
          </div>
          
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              id="facebook"
              name="facebook"
              type="url"
              value={socialMedia.facebook}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://facebook.com/username"
            />
          </div>
          
          <div>
            <label htmlFor="spotify" className="block text-sm font-medium text-gray-700 mb-1">Spotify</label>
            <input
              id="spotify"
              name="spotify"
              type="url"
              value={socialMedia.spotify}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://open.spotify.com/artist/..."
            />
          </div>
          
          <div>
            <label htmlFor="soundCloud" className="block text-sm font-medium text-gray-700 mb-1">SoundCloud</label>
            <input
              id="soundCloud"
              name="soundCloud"
              type="url"
              value={socialMedia.soundCloud}
              onChange={handleSocialMediaChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://soundcloud.com/username"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Producer
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProducer;