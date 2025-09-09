
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MissionVisionSection from '../components/MissionVision'

function Abouts() {
  return (
   <>
   <Header/>
   <div className='min-h-screen bg-black text-white'>
   <AboutSection/>
   <MissionVisionSection/>
   </div>
   <Footer/>
   </>
  )
}

export default Abouts