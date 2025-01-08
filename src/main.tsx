import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Routes, Route} from 'react-router'
import Home from './components/Home.tsx'
import Listings from './components/Listings.tsx'
import Profile from './components/Profile.tsx'
import Authoriser from './components/Authoriser.tsx'
import CreateListing from './components/CreateListing.tsx'
import MyListings from './components/MyListings.tsx'
import CurrentListing from './components/CurrentListing.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/listings" element={<Listings/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/auth" element={<Authoriser/>}/>
          <Route path='/createlisting' element={<CreateListing/>}/>
          <Route path="/mylistings" element={<MyListings/>}/>
          <Route path="/currentlisting" element={<CurrentListing/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
