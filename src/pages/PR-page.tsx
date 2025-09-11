import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import whatapp from "../assets/whatsapp.png";
import pr from "../assets/PR.jpeg";


function PRpage() {
  const { t } = useTranslation();

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
                  src={pr}
                  alt={t('pr.name')}
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
                    {t('pr.name')}
                  </h1>
                  <p className="text-xl text-red-600 dark:text-red-400 font-medium mb-6">
                    {t('pr.role')}
                  </p>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      {t('pr.biographyTitle')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t('pr.biography')}
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                    onClick={() => window.location.href = 'https://api.whatsapp.com/send/?phone=%2B250783054403&text&type=phone_number&app_absent=0'}
                     className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 cursor-pointer hover:bg-green-600 text-white font-medium rounded-lg transition-colors">
                      <img src={whatapp} alt="WhatsApp" className="h-10 w-10 text-green-500" />
                      {t('pr.contactButton')}
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