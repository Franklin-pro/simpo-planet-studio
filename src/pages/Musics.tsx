import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const musicData = [
  {
    id: 1,
    title: 'Sick mode',
    artist: 'Travis Scott',
    image: 'https://i.scdn.co/image/ab67616d0000b2736cfd9a7353f98f5165ea6160',
    url: 'https://www.youtube.com/watch?v=6ONzRpd2K0M',
    isPlaying: false,
  },
  {
    id: 2,
    title: 'Dior',
    artist: 'Lil tata',
    image: 'https://i.scdn.co/image/ab6761610000517437a465ddc4a787a925f81464',
    url: 'https://www.youtube.com/watch?v=6ONzRpd2K0M',
    isPlaying: false,
  },
  {
    id: 3,
    title: 'Richh',
    artist: 'Kyle richh',
    image: 'https://resources.tidal.com/images/270ce1b9/5143/4075/a9e1/336cc6f79eb1/750x750.jpg',
    url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    isPlaying: false,
  },
  {
    id: 4,
    title: 'On my own',
    artist: 'Jenn Carter',
    image: 'https://lastfm.freetls.fastly.net/i/u/ar0/41ab88de162945a28108ffedf811741d.jpg',
    url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    isPlaying: false,
  },
  {
    id: 5,
    title: 'Calling my phone',
    artist: 'lil Tjay',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Lil_Tjay_on_set_%28cropped_2%29.jpg',
    url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    isPlaying: false,
  },
  {
    id: 6,
    title: 'Mockingbird',
    artist: 'eminem',
    image: 'https://i.ytimg.com/vi/D4hAVemuQXY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDNcFk6W3xZXWcKGHcd37jnqTTabw',
    url: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    isPlaying: false,
  },
];

const Musics = () => {
  return (
    <>
      <Header />
      <div className='min-h-screen bg-black text-white pt-24'>
        <motion.h3
          className="text-3xl md:text-5xl text-center font-bold my-5 ml-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest <span className='text-red-500'>Musics</span>
        </motion.h3>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 py-4 sm:grid-cols-2 grid-cols-1 2xl:grid-cols-4 2xl:gap-10 xl:gap-8 gap-6 justify-start">
            {musicData.map((music) => (
              <motion.a
              href={music.url}
                key={music.id}
                target='_blank'
                className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md cursor-pointer w-full"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={music.image}
                  alt={music.title}
                  className="w-full h-48 object-cover object-top rounded-xl mb-4"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg md:text-sm font-semibold dark:text-gray-50 text-black">{music.title}</h3>
                    <p className="text-gray-500 dark:text-gray-50 md:text-sm max-sm:text-xs text-xl">{music.artist}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-black dark:bg-red-500 flex items-center gap-2 cursor-pointer hover:bg-red-400 hover:animate-pulse text-white p-3 rounded-full">
                      <Play size={16} /> 
                    </button>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Musics;
