import { useParams, Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Disc, Music, Globe, Calendar } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

interface Artist {
  _id: string;
  name: string;
  imageUrl: string;
  management: string;
  age: string;
  bio: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  createdAt: string;
  updatedAt: string;
}

const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://simpo-planet-studio-bn.onrender.com/api/v1/artists/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch artist: ${response.status}`);
        }

        const data = await response.json();
        setArtist(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-700 mb-4"></div>
            <div className="h-6 w-48 bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gray-700 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />
        <div className="pt-40 pb-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {error ? "Error Loading Artist" : "Artist Not Found"}
          </h1>
          {error && <p className="text-red-400 mb-6">{error}</p>}
          <Link 
            to="/artists" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Artists
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />

      {/* Hero Section */}
      <div className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Artist Image */}
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative group">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-indigo-500/30 shadow-2xl group-hover:border-indigo-500 transition-all duration-500"
                />
                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/20 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Music className="text-white text-5xl opacity-70" />
                </div>
              </div>
            </div>

            {/* Artist Info */}
            <div className="w-full lg:w-2/3 text-center lg:text-left mt-10 lg:mt-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {artist.name}
              </h1>
              <p className="text-xl text-indigo-300 mb-6">{artist.management}</p>
              
              <div className="max-w-2xl mx-auto lg:mx-0">
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {artist.bio}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar className="text-indigo-400" />
                  <span>{artist.age} years</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Globe className="text-indigo-400" />
                  <span>Rwanda</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Music className="text-indigo-400" />
                  <span>Reggae</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-4">
                {artist.socialLinks.facebook && (
                  <a
                    href={`https://${artist.socialLinks.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 shadow-lg"
                    aria-label={`${artist.name} Facebook`}
                  >
                    <Facebook size={20} />
                  </a>
                )}

                {artist.socialLinks.instagram && (
                  <a
                    href={`https://instagram.com/${artist.socialLinks.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 shadow-lg"
                    aria-label={`${artist.name} Instagram`}
                  >
                    <Instagram size={20} />
                  </a>
                )}

                {artist.socialLinks.twitter && (
                  <a
                    href={`https://twitter.com/${artist.socialLinks.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 shadow-lg"
                    aria-label={`${artist.name} Twitter`}
                  >
                    <Twitter size={20} />
                  </a>
                )}

                {artist.socialLinks.youtube && (
                  <a
                    href={`https://youtube.com/${artist.socialLinks.youtube}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 shadow-lg"
                    aria-label={`${artist.name} YouTube`}
                  >
                    <Youtube size={20} />
                  </a>
                )}

                {artist.socialLinks.tiktok && (
                  <a
                    href={`https://tiktok.com/@${artist.socialLinks.tiktok}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-all duration-300 text-white hover:scale-110 shadow-lg"
                    aria-label={`${artist.name} TikTok`}
                  >
                    <Disc size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {/* <div className="container mx-auto px-4 pb-20">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Music className="text-indigo-400" />
              <span>Discography</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group relative">
                  <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full flex items-center justify-center">
                      <Music className="text-gray-500 text-4xl" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-white font-medium">Album {item}</h3>
                    <p className="text-gray-400 text-sm">202{item}</p>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                      View Tracks
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Globe className="text-indigo-400" />
              <span>Artist Story</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Early Life</h3>
                <p className="text-gray-300 leading-relaxed">
                  Born Ndizihiwe Alain Jean Sauveur in Rwanda, {artist.name} discovered his passion for music at an early age. Growing up in a culturally rich environment, he was deeply influenced by traditional Rwandan sounds and the global reggae movement.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Musical Journey</h3>
                <p className="text-gray-300 leading-relaxed">
                  {artist.name} began his professional career in his late teens, quickly gaining recognition for his unique blend of reggae with African rhythms. His lyrics often touch on themes of social justice, African unity, and personal growth, earning him a dedicated following across the continent.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Philosophy</h3>
                <p className="text-gray-300 leading-relaxed">
                  As a Pan-Africanist, {artist.name} believes in the power of music to unite people and drive social change. His work reflects a deep commitment to African identity and the celebration of cultural heritage through contemporary musical expression.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Current Work</h3>
                <p className="text-gray-300 leading-relaxed">
                  Currently signed with {artist.management}, {artist.name} continues to produce music that resonates with audiences worldwide. He is actively involved in mentoring young artists and participating in cultural exchange programs across Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default ArtistDetails;