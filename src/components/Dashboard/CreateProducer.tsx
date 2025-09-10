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
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, trigger } = useForm<ProducerFormData>({
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
    },
    mode: 'onChange'
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [genreError, setGenreError] = useState('');
  const [skillError, setSkillError] = useState('');
  const [imageError, setImageError] = useState('');

    const socialMediaPatterns = {
    instagram: /^[a-zA-Z0-9._]{0,30}$/,
    twitter: /^[a-zA-Z0-9_]{0,15}$/,
    facebook: /^[a-zA-Z0-9.]{5,}$/,
    spotify: /^https?:\/\/(open\.spotify\.com\/artist\/|spoti\.fi\/)/,
    soundCloud: /^https?:\/\/(soundcloud\.com\/)/,
    youtube: /^https?:\/\/(www\.youtube\.com\/channel\/|youtube\.com\/channel\/|youtu\.be\/)/,
    appleMusic: /^https?:\/\/(music\.apple\.com\/)/,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setImageError('File size must be less than 5MB');
        return;
      }
      
      setImageFile(file);
      setImageError('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
        setValue('image', e.target?.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue('image', '');
    setImageError('Profile image is required');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ProducerFormData, value, { shouldValidate: true });
  };

  const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const validateForm = async () => {
    // Validate current tab before proceeding
    if (activeTab === 'basic') {
      const isValid = await trigger(['name', 'level', 'bio']);
      if (!isValid || !imageFile) {
        if (!imageFile) setImageError('Profile image is required');
        return false;
      }
    } else if (activeTab === 'details') {
      const genres = watch('genres');
      const skills = watch('skills');
      
      if (!genres || genres.length === 0) {
        setGenreError('Please select at least one genre');
        return false;
      }
      
      if (!skills || skills.length === 0) {
        setSkillError('Please select at least one skill');
        return false;
      }
      
      const isValid = await trigger(['yearsExperience', 'contactEmail']);
      if (!isValid) return false;
    }
    
    return true;
  };

    const validateSocialMedia = (field: keyof ProducerFormData['socialMedia'], value: string) => {
    if (!value) return true; // Empty is allowed
    
    switch (field) {
      case 'instagram':
        return socialMediaPatterns.instagram.test(value) || 
               "Instagram username can only contain letters, numbers, periods and underscores (max 30 characters)";
      case 'twitter':
        return socialMediaPatterns.twitter.test(value) || 
               "Twitter username can only contain letters, numbers and underscores (max 15 characters)";
      case 'facebook':
        return socialMediaPatterns.facebook.test(value) || 
               "Please enter a valid Facebook username (at least 5 characters)";
      case 'spotify':
        return socialMediaPatterns.spotify.test(value) || 
               "Please enter a valid Spotify artist URL (should start with https://open.spotify.com/artist/ or https://spoti.fi/)";
      case 'soundCloud':
        return socialMediaPatterns.soundCloud.test(value) || 
               "Please enter a valid SoundCloud URL (should start with https://soundcloud.com/)";
      case 'youtube':
        return socialMediaPatterns.youtube.test(value) || 
               "Please enter a valid YouTube channel URL (should be a channel link)";
      case 'appleMusic':
        return socialMediaPatterns.appleMusic.test(value) || 
               "Please enter a valid Apple Music URL (should start with https://music.apple.com/)";
      default:
        return true;
    }
  };

  const handleTabChange = async (tab: string) => {
    const isValid = await validateForm();
    if (isValid) {
      setActiveTab(tab);
      // Clear errors when changing tabs
      setGenreError('');
      setSkillError('');
      setImageError('');
    }
  };

  const onSubmit = async (data: ProducerFormData) => {
    // Final validation before submission
    if (!imageFile) {
      setImageError('Profile image is required');
      setActiveTab('basic');
      return;
    }
    
    const genres = watch('genres');
    const skills = watch('skills');
    
    if (!genres || genres.length === 0) {
      setGenreError('Please select at least one genre');
      setActiveTab('details');
      return;
    }
    
    if (!skills || skills.length === 0) {
      setSkillError('Please select at least one skill');
      setActiveTab('details');
      return;
    }

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
        setGenreError('');
        setSkillError('');
        setImageError('');
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
    }, { shouldValidate: true });
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
    let newGenres;
    
    if (currentGenres.includes(genre)) {
      newGenres = currentGenres.filter(g => g !== genre);
    } else {
      newGenres = [...currentGenres, genre];
    }
    
    setValue('genres', newGenres, { shouldValidate: true });
    setGenreError(newGenres.length === 0 ? 'Please select at least one genre' : '');
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = watch('skills') ?? [];
    let newSkills;
    
    if (currentSkills.includes(skill)) {
      newSkills = currentSkills.filter(s => s !== skill);
    } else {
      newSkills = [...currentSkills, skill];
    }
    
    setValue('skills', newSkills, { shouldValidate: true });
    setSkillError(newSkills.length === 0 ? 'Please select at least one skill' : '');
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
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center mb-8">
        <Music className="text-blue-600 text-3xl mr-3" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Producer Profile Creation</h1>
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
      
      <div className="flex mb-8 border-b border-gray-200 dark:border-gray-600">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium ${activeTab === 'basic' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <User className="inline mr-2" size={16} />
          Basic Info
        </button>
        <button
          onClick={() => handleTabChange('details')}
          className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
        >
          <Award className="inline mr-2" size={16} />
          Details
        </button>
        <button
          onClick={() => handleTabChange('social')}
          className={`px-4 py-2 font-medium ${activeTab === 'social' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { 
                    required: "Name is required", 
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                    maxLength: { value: 50, message: "Name must not exceed 50 characters" },
                    pattern: { value: /^[a-zA-Z\s\-']+$/, message: "Name can only contain letters, spaces, hyphens, and apostrophes" }
                  })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200'}`}
                  placeholder="e.g. Max Martin"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="level"
                  {...register("level", { 
                    required: "Experience level is required",
                    validate: value => value !== "" || "Please select an experience level"
                  })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.level ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-200'}`}
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profile Image <span className="text-red-500">*</span></label>
              {!imageFile ? (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
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
              {imageError && <p className="mt-1 text-sm text-red-600">{imageError}</p>}
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
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
                maxLength={500}
                rows={5}
                className={`w-full px-4 py-3 border dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.bio ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
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
                onClick={() => handleTabChange('details')}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  Primary Genres <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {genreOptions.map(genre => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${watch('genres')?.includes(genre) ? 'bg-blue-600 text-white border border-blue-700' : 'bg-gray-100 dark:bg-gray-500 dark:text-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-400'}`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {genreError && <p className="mt-1 text-sm text-red-600">{genreError}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-2">
                  Core Skills <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${watch('skills')?.includes(skill) ? 'bg-blue-600 text-white border border-blue-700' : 'bg-gray-100 dark:bg-gray-500 dark:text-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-400'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {skillError && <p className="mt-1 text-sm text-red-600">{skillError}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <input
                  id="yearsExperience"
                  type="number"
                  {...register("yearsExperience", { 
                    valueAsNumber: true, 
                    required: "Years of experience is required",
                    min: { value: 0, message: "Must be at least 0 years" }, 
                    max: { value: 50, message: "Must be at most 50 years" }
                  })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 ${errors.yearsExperience ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                  min="0"
                  max="50"
                />
                {errors.yearsExperience && <p className="mt-1 text-sm text-red-600">{errors.yearsExperience.message}</p>}
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">
                  Professional Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    },
                    maxLength: { value: 100, message: "Email must not exceed 100 characters" }
                  })}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300  rounded-lg focus:outline-none focus:ring-2 ${errors.contactEmail ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                  placeholder="your.email@studio.com"
                />
                {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                  Notable Credits
                </label>
                <button
                  type="button"
                  onClick={addCredit}
                  className="flex items-center text-sm text-blue-500 hover:text-blue-800"
                >
                  <Plus className="mr-1" size={16} /> Add Credit
                </button>
              </div>
              
              <div className="space-y-4">
                {(watch('credits') ?? []).map((_, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-medium dark:text-gray-100 text-gray-500 mb-1">Project</label>
                      <input
                        {...register(`credits.${index}.project`)}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Album/Single Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium dark:text-gray-100 text-gray-500 mb-1">Role</label>
                      <input
                        {...register(`credits.${index}.role`)}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Producer/Mixer/etc"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-medium dark:text-gray-100 text-gray-500 mb-1">Year</label>
                        <input
                          type="number"
                          {...register(`credits.${index}.year`, { valueAsNumber: true })}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                onClick={() => handleTabChange('social')}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
                <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Instagram
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    instagram.com/
                  </span>
                  <input
                    id="instagram"
                    type="text"
                    {...register("socialMedia.instagram", {
                      validate: (value) => validateSocialMedia('instagram', value)
                    })}
                    onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                    className={`flex-1 min-w-0 block w-full px-3 py-2 dark:bg-gray-700 dark:text-gray-300 rounded-none rounded-r-md border-gray-300 focus:outline-none focus:ring-2 ${
                      errors.socialMedia?.instagram ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="yourusername"
                  />
                </div>
                {errors.socialMedia?.instagram && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.instagram.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Twitter / X
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    twitter.com/
                  </span>
                  <input
                    id="twitter"
                    type="text"
                    {...register("socialMedia.twitter", {
                      validate: (value) => validateSocialMedia('twitter', value)
                    })}
                    onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                    className={`flex-1 min-w-0 block w-full dark:bg-gray-700 dark:text-gray-300 px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:outline-none focus:ring-2 ${
                      errors.socialMedia?.twitter ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="yourusername"
                  />
                </div>
                {errors.socialMedia?.twitter && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.twitter.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Facebook
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    facebook.com/
                  </span>
                  <input
                    id="facebook"
                    type="text"
                    {...register("socialMedia.facebook", {
                      validate: (value) => validateSocialMedia('facebook', value)
                    })}
                    onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                    className={`flex-1 min-w-0 block w-full px-3 dark:bg-gray-700 dark:text-gray-300 py-2 rounded-none rounded-r-md border-gray-300 focus:outline-none focus:ring-2 ${
                      errors.socialMedia?.facebook ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200 focus:border-blue-500'
                    }`}
                    placeholder="yourusername"
                  />
                </div>
                {errors.socialMedia?.facebook && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.facebook.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="spotify" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Spotify Artist Page
                </label>
                <input
                  id="spotify"
                  type="url"
                  {...register("socialMedia.spotify", {
                    validate: (value) => validateSocialMedia('spotify', value)
                  })}
                  onChange={(e) => handleSocialMediaChange('spotify', e.target.value)}
                  className={`w-full px-4 py-3 border dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.socialMedia?.spotify ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="https://open.spotify.com/artist/..."
                />
                {errors.socialMedia?.spotify && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.spotify.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="soundCloud" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  SoundCloud
                </label>
                <input
                  id="soundCloud"
                  type="url"
                  {...register("socialMedia.soundCloud", {
                    validate: (value) => validateSocialMedia('soundCloud', value)
                  })}
                  onChange={(e) => handleSocialMediaChange('soundCloud', e.target.value)}
                  className={`w-full px-4 py-3 border dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.socialMedia?.soundCloud ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="https://soundcloud.com/yourusername"
                />
                {errors.socialMedia?.soundCloud && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.soundCloud.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  YouTube Channel
                </label>
                <input
                  id="youtube"
                  type="url"
                  {...register("socialMedia.youtube", {
                    validate: (value) => validateSocialMedia('youtube', value)
                  })}
                  onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
                  className={`w-full px-4 py-3 border dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.socialMedia?.youtube ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="https://youtube.com/yourchannel"
                />
                {errors.socialMedia?.youtube && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.youtube.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="appleMusic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Apple Music
                </label>
                <input
                  id="appleMusic"
                  type="url"
                  {...register("socialMedia.appleMusic", {
                    validate: (value) => validateSocialMedia('appleMusic', value)
                  })}
                  onChange={(e) => handleSocialMediaChange('appleMusic', e.target.value)}
                  className={`w-full px-4 py-3 border dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.socialMedia?.appleMusic ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  placeholder="https://music.apple.com/artist/..."
                />
                {errors.socialMedia?.appleMusic && (
                  <p className="mt-1 text-sm text-red-600">{errors.socialMedia.appleMusic.message}</p>
                )}
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
                className={`px-8 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-all hover:shadow-lg flex items-center justify-center ${
                  isSubmitting 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-600 text-white hover:from-blue-700 hover:to-blue-700'
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