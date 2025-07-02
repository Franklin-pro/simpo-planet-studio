import { useParams, Link } from "react-router-dom";
import {
  Disc,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { artists } from "../data/artists"; // Import centralized data

const ArtistDetails = () => {


  const { id } = useParams();
  const teacher = artists.find(
    (artist) => artist.id === parseInt(id || "0")
  );

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-20 text-center">
          <h1 className="text-4xl font-bold text-black mb-4">
            Artist Not Found
          </h1>
          <Link to="/#artists" className="text-red-500 hover:text-red-600">
            Back to Artists
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 bg-gray-900">
      <Header />

      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">


          {/* Hero Section */}
          <div className="bg-blue-950 rounded-2xl mt-8 overflow-hidden mb-8">
            <div className="relative p-8 md:p-12">
              {/* Decorative Elements */}
            {/* Right Decorative Element */}
<div className="absolute top-[-32px] right-[-75px] h-96 w-96 opacity-20 hidden md:block">
  <div className="w-full h-full bg-white rounded-full transform rotate-12"></div>
</div>



              <div className="flex flex-col md:flex-row justify-center items-center relative z-10">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="relative ">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover object-left-top border-4 border-white shadow-xl"
                    />
                  </div>
                </div>

                <div className=" md:w-1/3 md:pl-12 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {teacher.name}
                  </h1>
                  <p className="text-xl text-teal-100 mb-4">
                    {teacher.specialty}
                  </p>
                  <p className="text-teal-200 mb-6">{teacher.management}</p>

                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start space-x-4">
                    {/* Instagram */}
                    {teacher.socials.instagram &&
                      teacher.socials.instagram !== "#" && (
                        <a
                          href={teacher.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                          aria-label={`${teacher.name} Instagram`}
                        >
                          <Instagram size={20} />
                        </a>
                      )}

                    {/* Twitter */}
                    {teacher.socials.twitter &&
                      teacher.socials.twitter !== "#" && (
                        <a
                          href={teacher.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                          aria-label={`${teacher.name} Twitter`}
                        >
                          <Twitter size={20} />
                        </a>
                      )}

                    {/* TikTok */}
                    {teacher.socials.tiktok &&
                      teacher.socials.tiktok !== "#" && (
                        <a
                          href={teacher.socials.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                          aria-label={`${teacher.name} TikTok`}
                        >
                          <Disc size={20} />
                        </a>
                      )}

                    {/* YouTube */}
                    {teacher.socials.youtube &&
                      teacher.socials.youtube !== "#" && (
                        <a
                          href={teacher.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                          aria-label={`${teacher.name} YouTube`}
                        >
                          <Youtube size={20} />
                        </a>
                      )}
                    {teacher.socials.facebook &&
                      teacher.socials.facebook !== "#" && (
                        <a
                          href={teacher.socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 text-white hover:scale-110"
                          aria-label={`${teacher.name} Facebook`}
                        >
                          <Facebook size={20} />
                        </a>
                      )}
                  </div>
                </div>
              </div>
             {/* Left Decorative Element */}
<div className="absolute top-[-32px] left-[-75px] h-96 w-96 opacity-20 hidden md:block">
  <div className="w-full h-full bg-white rounded-full transform rotate-12"></div>
</div>
            </div>
          </div>

          {/* Content Section */}
          <div className="rounded-xl bg-black/25 text-white shadow-lg p-8 md:p-12">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-6">ABOUT</h2>

              <div className="space-y-8">
                <div>
                  <p className=" leading-relaxed text-lg text-gray-400">
                    {teacher.about}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className=" leading-relaxed text-gray-400 text-lg">
                    {teacher.education}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Hobbies</h3>
                  <p className=" leading-relaxed text-gray-400 text-lg">
                    {teacher.hobbies}
                  </p>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="md:text-left flex justify-start gap-2 items-center">
                      <span className="font-semibold text-lg">Age:</span>
                      <span className="text-gray-400">{teacher.age}</span>
                    </div>
                    <div className="md:text-right flex justify-end gap-2 items-center">
                      <span className="font-semibold text-lg">Management:</span>
                      <span className="text-gray-400">
                        {teacher.management}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistDetails;
