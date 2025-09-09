import { motion } from "framer-motion";
import whatapp from "../assets/whatsapp.png";


function PRpage() {
  const prData = {
    image: "https://physicaleducationandwellness.mit.edu/wp-content/uploads/Untitled-1.png",
    name: "Sarah Johnson",
    role: "Public Relations Manager",
    biography: "Sarah is a seasoned PR professional with over 8 years of experience in the music industry. She has successfully managed publicity campaigns for numerous artists, helping them build their brand and connect with their audience. Her expertise includes media relations, brand strategy, social media management, and crisis communication. Sarah's passion for music and her strategic approach have made her an invaluable asset to artists looking to elevate their public presence."
  };

  return (
    <div className=" bg-gray-50 dark:bg-gray-900">
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-1/3">
                <img
                  src={prData.image}
                  alt={prData.name}
                  className="w-full h-96 md:h-full object-cover"
                />
              </div>
              
              {/* Content Section */}
              <div className="md:w-2/3 p-8 md:p-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {prData.name}
                  </h1>
                  <p className="text-xl text-red-600 dark:text-red-400 font-medium mb-6">
                    {prData.role}
                  </p>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      Biography
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {prData.biography}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                    onClick={() => window.location.href = 'https://api.whatsapp.com/send/?phone=%2B250783054403&text&type=phone_number&app_absent=0'}
                     className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 cursor-pointer hover:bg-green-600 text-white font-medium rounded-lg transition-colors">
                      <img src={whatapp} alt="WhatsApp" className="h-10 w-10 text-green-500" />
                      Contact on WhatsApp
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PRpage