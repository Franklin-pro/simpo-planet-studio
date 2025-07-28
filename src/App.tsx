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
import AddArtists from './pages/admin/AddArtist';
import ManagingArtist from './pages/admin/ManageArtist';
import DashboardLayout from './components/DashboardLayout';
import AddGallery from './pages/admin/AddGallery';
import ManageGallerys from './pages/admin/ManageGallery';
import UploadMusics from './pages/admin/UploadMusics';
import ManageMusic from './pages/admin/ManageMusic';
function App() {

  return (
    <>
    <BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/founder" element={<FounderSection />} />
    <Route path="/artist/:id" element={<ArtistDetails />} />
    <Route path="/contacts" element={<Contacts />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/abouts" element={<Abouts />} />
    <Route path="/musics" element={<Musics />} />

    {/* NESTED ADMIN ROUTES */}
    <Route path="/admin" element={<DashboardLayout />}>
      <Route path="artists/create" element={<AddArtists />} />
      <Route path="gallery/create" element={<AddGallery />} />
      <Route path="gallery/manage" element={<ManageGallerys />} />
      <Route path="music/upload" element={<UploadMusics />} />
      <Route path="music/manage" element={<ManageMusic />} />
      <Route path="artists/manage" element={<ManagingArtist />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

    </>
  )
}

export default App
