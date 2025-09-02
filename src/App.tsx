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
import LoginAccount from './pages/LoginAccount';
import ManageProducers from './components/Dashboard/ManageProducers';
import CreateProducer from './components/Dashboard/CreateProducer';
import ProducerDetails from './components/ProducerDetails';
import FilmMakerPage from './pages/FilmMakerPage';
import FilmMakerDetailsPage from './pages/FilmMakerDetailsPage';
import AddFilmmaker from './pages/admin/AddFilmmaker';
import { ThemeProvider } from './contexts/ThemeProvider';
import Dashboard from './pages/admin/Dashboard';
import GalleryDetails from './pages/GalleryDetails';
function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/founder" element={<FounderSection />} />
    <Route path="/artist/:id" element={<ArtistDetails />} />
     <Route path="/producer/:id" element={<ProducerDetails />} />
    <Route path="/contacts" element={<Contacts />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/gallery/:id" element={<GalleryDetails />} />
    <Route path="/abouts" element={<Abouts />} />
    <Route path="/musics" element={<Musics />} />
    <Route path="/filmmakers" element={<FilmMakerPage />}/>
    <Route path="/filmmakers/:id" element={<FilmMakerDetailsPage />}/>
    <Route path="/login" element={<LoginAccount />} />

    {/* NESTED ADMIN ROUTES */}
    <Route path="/admin" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="artists/create" element={<AddArtists />} />
      <Route path="gallery/create" element={<AddGallery />} />
      <Route path="gallery/manage" element={<ManageGallerys />} />
      <Route path="producer/manage" element={<ManageProducers />} />
      <Route path="producer/create" element={<CreateProducer />} />
      <Route path="filmmaker/create" element={<AddFilmmaker />} />
      <Route path="music/upload" element={<UploadMusics />} />
      <Route path="music/manage" element={<ManageMusic />} />
      <Route path="artists/manage" element={<ManagingArtist />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
    </ThemeProvider>
  )
}

export default App
