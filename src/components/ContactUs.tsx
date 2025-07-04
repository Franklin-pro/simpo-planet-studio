import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="text-red-500">Touch</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions or want to learn more about our music label? Fill out the form below or contact us directly. We look forward to hearing from you!
          </p>
        </motion.div>

        {/* Contact Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {/* Phone */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-300">(+250) 783054403</p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                  >
                    <Mail className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-300">Simpoplanet@gmail.com</p>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-300">Kigali, Rwanda, Remera-Giporoso, KN5rd</p>
                  </div>
                </motion.div>

                {/* Hours */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 10 }}
                  >
                    <Clock className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-300">Mon-Fri: 6AM-10PM</p>
                    <p className="text-gray-300">Sat-Sun: 8AM-8PM</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            className="bg-gray-900 rounded-lg p-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              Send us a Message
            </motion.h3>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {/* First Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <motion.input
                    type="text"
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="John"
                    whileFocus={{ scale: 1.01, borderColor: "#ef4444" }}
                  />
                </motion.div>

                {/* Last Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <motion.input
                    type="text"
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                    placeholder="Doe"
                    whileFocus={{ scale: 1.01, borderColor: "#ef4444" }}
                  />
                </motion.div>
              </div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                <label className="block text-sm font-medium mb-2">Email</label>
                <motion.input
                  type="email"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                  placeholder="john@example.com"
                  whileFocus={{ scale: 1.01, borderColor: "#ef4444" }}
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                <label className="block text-sm font-medium mb-2">Phone</label>
                <motion.input
                  type="tel"
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none"
                  placeholder="(123) 456-7890"
                  whileFocus={{ scale: 1.01, borderColor: "#ef4444" }}
                />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
              >
                <label className="block text-sm font-medium mb-2">Message</label>
                <motion.textarea
                  rows={4}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none resize-none"
                  placeholder="Tell us about your studio label goals..."
                  whileFocus={{ scale: 1.01, borderColor: "#ef4444" }}
                ></motion.textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-red-500 text-white cursor-pointer py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(239, 68, 68, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
