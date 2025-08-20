import { Award, Image as ImageIcon, Link, Music, Plus, Trash2, User, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ProducerFormData {
  name: string;
  level: string;
  image?: string;
  bio: string;
  genres: string[];
  skills: string[];
  contactEmail: string;
  yearsExperience: number;
  credits: Array<{
    project: string;
    role: string;
    year: number;
  }>;
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
    spotify: string;
    soundCloud: string;
    youtube: string;
    appleMusic: string;
  };
}

function CreateProducer() {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<ProducerFormData>({
    defaultValues: {
      genres: [],
      skills: [],
      credits: [],
      socialMedia: {
        instagram: '',
        twitter: '',
        facebook: '',
        spotify: '',
        soundCloud: '',
        youtube: '',
        appleMusic: ''
      }
    }
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        // Optionally set the form value for validation, but we won't rely on it for submission
        setValue('image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue('image', '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ProducerFormData, value);
  };

  const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: ProducerFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Convert imageFile to Base64 if it exists
      let imageBase64 = '';
      if (imageFile) {
        imageBase64 = (await convertToBase64(imageFile)) as string;
      }

      const payload = {
        ...data,
        image: imageBase64, // Use the freshly converted Base64 string
        genres: JSON.stringify(data.genres),
        skills: JSON.stringify(data.skills),
        credits: JSON.stringify(data.credits),
        socialMedia: JSON.stringify(data.socialMedia)
      };

      const response = await fetch('https://simpo-planet-studio-bn.onrender.com/api/v1/producer/add-producer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Producer created successfully:', result);
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        reset();
        setImageFile(null);
        setImagePreview(null);
        setActiveTab('basic');
        setSubmitStatus('idle');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating producer:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialMediaChange = (field: keyof ProducerFormData['socialMedia'], value: string) => {
    const currentSocialMedia = watch('socialMedia') ?? {};
    setValue('socialMedia', {
      ...currentSocialMedia,
      [field]: value
    });
  };

  const addCredit = () => {
    const currentCredits = watch('credits') ?? [];
    setValue('credits', [...currentCredits, { project: '', role: '', year: new Date().getFullYear() }]);
  };

  const removeCredit = (index: number) => {
    const currentCredits = watch('credits') ?? [];
    setValue('credits', currentCredits.filter((_, i) => i !== index));
  };

  const toggleGenre = (genre: string) => {
    const currentGenres = watch('genres') ?? [];
    if (currentGenres.includes(genre)) {
      setValue('genres', currentGenres.filter(g => g !== genre));
    } else {
      setValue('genres', [...currentGenres, genre]);
    }
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = watch('skills') ?? [];
    if (currentSkills.includes(skill)) {
      setValue('skills', currentSkills.filter(s => s !== skill));
    } else {
      setValue('skills', [...currentSkills, skill]);
    }
  };

  const genreOptions = [
    'Pop', 'Hip-Hop', 'R&B', 'Rock', 'Electronic',
    'Jazz', 'Classical', 'Country', 'Reggae', 'Metal',
    'Folk', 'Blues', 'World', 'Experimental'
  ];

  const skillOptions = [
    'Mixing', 'Mastering', 'Sound Design', 'Arrangement',
    'Composition', 'Vocal Production', 'Beat Making',
    'Live Recording', 'MIDI Programming', 'Audio Restoration',
    'Foley', 'Synthesis', 'Orchestration', 'Lyric Writing'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-8">
        <Music className="text-indigo-600 text-3xl mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">Producer Profile Creation</h1>
      </div>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          ✅ Producer profile created successfully! Resetting form...
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          ❌ Error creating producer profile. Please try again.
        </div>
      )}
      
      <div className="flex mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium ${activeTab === 'basic' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          <User className="inline mr-2" size={16} />
          Basic Info
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          <Award className="inline mr-2" size={16} />
          Details
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`px-4 py-2 font-medium ${activeTab === 'social' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          <Link className="inline mr-2" size={16} />
          Social & Links
        </button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                  placeholder="e.g. Max Martin"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="level"
                  {...register("level", { required: "Level is required" })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.level ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                >
                  <option value="">Select your level</option>
                  <option value="Junior">Junior (0-3 years)</option>
                  <option value="Mid-level">Mid-level (3-7 years)</option>
                  <option value="Senior">Senior (7-15 years)</option>
                  <option value="Legendary">Legendary (15+ years)</option>
                </select>
                {errors.level && <p className="mt-1 text-sm text-red-600">{errors.level.message}</p>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (Optional)</label>
              {!imageFile ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (Max. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="relative w-full h-64">
                  <img
                    src={imagePreview || ''}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Professional Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio"
                {...register("bio", { 
                  required: "Bio is required",
                  minLength: { value: 50, message: "Bio should be at least 50 characters" },
                  maxLength: { value: 500, message: "Bio should not exceed 500 characters" }
                })}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.bio ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                placeholder="Describe your musical background, specialties, and approach to production..."
              />
              {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>}
              <p className="mt-1 text-xs text-gray-500">
                {watch('bio')?.length || 0}/500 characters (minimum 50 required)
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Next: Professional Details
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Genres <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {genreOptions.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${watch('genres')?.includes(genre) ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register("genres", { validate: value => (value?.length ?? 0) > 0 || "Select at least one genre" })}
                />
                {errors.genres && <p className="mt-1 text-sm text-red-600">{errors.genres.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Core Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${watch('skills')?.includes(skill) ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' : 'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register("skills", { validate: value => (value?.length ?? 0) > 0 || "Select at least one skill" })}
                />
                {errors.skills && <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <input
                  id="yearsExperience"
                  type="number"
                  {...register("yearsExperience", { 
                    valueAsNumber: true, 
                    required: "Years of experience is required",
                    min: { value: 0, message: "Must be at least 0" }, 
                    max: { value: 50, message: "Must be at most 50" } 
                  })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.yearsExperience ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                  min="0"
                  max="50"
                />
                {errors.yearsExperience && <p className="mt-1 text-sm text-red-600">{errors.yearsExperience.message}</p>}
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email"
                    }
                  })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.contactEmail ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'}`}
                  placeholder="your.email@studio.com"
                />
                {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Notable Credits
                </label>
                <button
                  type="button"
                  onClick={addCredit}
                  className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
                >
                  <Plus className="mr-1" size={16} /> Add Credit
                </button>
              </div>
              
              <div className="space-y-4">
                {(watch('credits') ?? []).map((_, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Project</label>
                      <input
                        {...register(`credits.${index}.project`)}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        placeholder="Album/Single Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                      <input
                        {...register(`credits.${index}.role`)}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        placeholder="Producer/Mixer/etc"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                        <input
                          type="number"
                          {...register(`credits.${index}.year`, { valueAsNumber: true })}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                          min="1900"
                          max={new Date().getFullYear()}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCredit(index)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('social')}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Next: Social & Links
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    instagram.com/
                  </span>
                  <input
                    id="instagram"
                    type="text"
                    value={watch('socialMedia.instagram') ?? ''}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                    placeholder="yourusername"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    twitter.com/
                  </span>
                  <input
                    id="twitter"
                    type="text"
                    value={watch('socialMedia.twitter') ?? ''}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                    placeholder="yourusername"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    facebook.com/
                  </span>
                  <input
                    id="facebook"
                    type="text"
                    value={watch('socialMedia.facebook') ?? ''}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                    placeholder="yourusername"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="spotify" className="block text-sm font-medium text-gray-700 mb-1">
                  Spotify Artist Page
                </label>
                <input
                  id="spotify"
                  type="url"
                  value={watch('socialMedia.spotify') ?? ''}
                  onChange={(e) => handleSocialMediaChange('spotify', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="https://open.spotify.com/artist/..."
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="soundCloud" className="block text-sm font-medium text-gray-700 mb-1">
                  SoundCloud
                </label>
                <input
                  id="soundCloud"
                  type="url"
                  value={watch('socialMedia.soundCloud') ?? ''}
                  onChange={(e) => handleSocialMediaChange('soundCloud', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="https://soundcloud.com/yourusername"
                />
              </div>
              
              <div>
                <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
                  YouTube Channel
                </label>
                <input
                  id="youtube"
                  type="url"
                  value={watch('socialMedia.youtube') ?? ''}
                  onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="https://youtube.com/yourchannel"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="appleMusic" className="block text-sm font-medium text-gray-700 mb-1">
                  Apple Music
                </label>
                <input
                  id="appleMusic"
                  type="url"
                  value={watch('socialMedia.appleMusic') ?? ''}
                  onChange={(e) => handleSocialMediaChange('appleMusic', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="https://music.apple.com/artist/..."
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md transition-all hover:shadow-lg flex items-center justify-center ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Profile...
                  </>
                ) : 'Complete Profile'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateProducer;