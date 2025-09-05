
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FounderSection from '../components/Founder';
import MissionVisionSection from '../components/MissionVision';
import ArtistSection from '../components/ArtistSection';
import ArtGallery from '../components/Gallery';
import ContactSection from '../components/ContactUs';
import Footer from '../components/Footer';
import Producers from '../components/Producers';

const Index = () => {
  return (
    <div className="min-h-screen">
    <Header/>
<HeroSection/>
<AboutSection/>
<FounderSection/>
<MissionVisionSection/>
<Producers isHomePage={true} />
<ArtistSection isHomePage={true} />
<ArtGallery isHomePage={true} />
<ContactSection/>
 <Footer/>
    </div>
  );
};

export default Index;