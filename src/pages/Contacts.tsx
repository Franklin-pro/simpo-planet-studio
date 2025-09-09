import ContactSection from "../components/ContactUs";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Contacts() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        <ContactSection />
      </div>

      <Footer />
    </>
  );
}

export default Contacts;
