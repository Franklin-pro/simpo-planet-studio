import { useState, useRef } from 'react';

const AddFilmmaker = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    image: null,
    specialization: 'Director',
    experience: 0,
    email: '',
    phone: '',
    portfolio: [{ title: '', year: new Date().getFullYear(), role: '' }]
  });

    const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setFormData({ ...formData, image: base64 });
      setImagePreview(base64);
    }
  };

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = {
      name: formData.name,
      bio: formData.bio,
      image: formData.image,
      specialization: formData.specialization,
      experience: formData.experience,
      portfolio: formData.portfolio,
      contact: {
        email: formData.email,
        phone: formData.phone
      }
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/filmmaker/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Filmmaker created successfully!');
        // Reset form
        setFormData({
          name: '',
          bio: '',
          image: null,
          specialization: 'Director',
          experience: 0,
          email: '',
          phone: '',
          portfolio: [{ title: '', year: new Date().getFullYear(), role: '' }]
        });
        setImagePreview(null);
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      alert('Error creating filmmaker: ' + error.message);
    }
  };

  const addPortfolioItem = () => {
    setFormData({
      ...formData,
      portfolio: [...formData.portfolio, { title: '', year: new Date().getFullYear(), role: '' }]
    });
  };

  const removePortfolioItem = (index) => {
    if (formData.portfolio.length <= 1) return;
    const updated = formData.portfolio.filter((_, i) => i !== index);
    setFormData({ ...formData, portfolio: updated });
  };

  const updatePortfolio = (index, field, value) => {
    const updated = formData.portfolio.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, portfolio: updated });
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData({ ...formData, image: file });
      
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
    fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900  text-center">Add New Filmmaker</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8 bg-gray-50 p-8 rounded-xl shadow-md">
        {/* Personal Information Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900  border-b pb-2 border-gray-200 ">
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 ">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg bg-white text-gray-900  border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 ">
                Specialization <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="w-full p-3 border rounded-lg bg-white text-gray-900  border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Director">Director</option>
                <option value="Producer">Producer</option>
                <option value="Cinematographer">Cinematographer</option>
                <option value="Editor">Editor</option>
                <option value="Writer">Writer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 ">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 border rounded-lg bg-white  text-gray-900  border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Tell us about the filmmaker's background and achievements"
            />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900  border-b pb-2 border-gray-200 ">
            Profile Image
          </h2>
          
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300  rounded-lg bg-white ">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            {imagePreview ? (
              <div className="relative mb-4">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-40 w-40 object-cover rounded-full mx-auto border-4 border-white  shadow-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-center p-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500  mb-4">JPG, PNG or GIF (Max 5MB)</p>
              </div>
            )}
            
            <button
              type="button"
              onClick={triggerFileInput}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </button>
          </div>
        </div>

        {/* Professional Details Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900  border-b pb-2 border-gray-200 ">
            Professional Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 ">
                Experience (years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                className="w-full p-3 border rounded-lg bg-white text-gray-900  border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 ">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg bg-white text-gray-900  border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="filmmaker@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 ">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-3 border rounded-lg bg-white text-gray-900  border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-2 border-gray-200 ">
            <h2 className="text-xl font-semibold text-gray-900 ">Portfolio</h2>
            <button
              type="button"
              onClick={addPortfolioItem}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Project
            </button>
          </div>
          
          {formData.portfolio.map((project, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border rounded-lg bg-white border-gray-300  shadow-sm">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700 ">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g., The Midnight Sun"
                  value={project.title}
                  onChange={(e) => updatePortfolio(index, 'title', e.target.value)}
                  className="w-full p-2.5 border rounded bg-white  text-gray-900  border-gray-300  focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 ">Year</label>
                <input
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={project.year}
                  onChange={(e) => updatePortfolio(index, 'year', parseInt(e.target.value))}
                  className="w-full p-2.5 border rounded bg-white  text-gray-900  border-gray-300  focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="flex items-end space-x-2">
                <div className="flex-grow">
                  <label className="block text-sm font-medium mb-1 text-gray-700 ">Role</label>
                  <input
                    type="text"
                    placeholder="e.g., Director"
                    value={project.role}
                    onChange={(e) => updatePortfolio(index, 'role', e.target.value)}
                    className="w-full p-2.5 border rounded bg-white text-gray-900  border-gray-300  focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                {formData.portfolio.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePortfolioItem(index)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove project"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-md"
          >
            Add Filmmaker
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFilmmaker;