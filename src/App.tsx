import './App.css'
import FounderSection from './components/Founder'
import ArtistDetails from './pages/ArtistDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Contacts from './pages/Contacts';
import Abouts from './pages/Abouts';
import Gallery from './pages/Gallery';
import Musics from './pages/Musics';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/founder" element={<FounderSection />} />
          <Route path="/artist/:id" element={<ArtistDetails />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/abouts" element={<Abouts />} />
          <Route path="/musics" element={<Musics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
