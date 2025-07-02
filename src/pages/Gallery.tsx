import Footer from "../components/Footer";
import ArtGallery from "../components/Gallery";
import Header from "../components/Header";

function Gallery() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white pt-24">
        <ArtGallery />
      </div>

      <Footer />
    </>
  );
}

export default Gallery;
