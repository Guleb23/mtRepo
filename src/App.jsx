import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'

import NavBar from './Components/NavBar'
import Services from './Components/Screens/Services'
import Documents from './Components/Screens/Documents'
import PersonalData from './Components/Screens/PersonalData'
import Profile from './Components/Screens/Profile'
import AboutObjects from './Components/Screens/AboutObjects'
import ServiceDetails from './Components/Screens/ServiceDetails';

function App() {

  return (


    <section className='w-screen h-screen overflow-x-hidden '>
      <div className=' h-full px-1 md:px-5 pt-12 lg:px-40 '>
        <Routes>
          <Route path='/' element={<Services />} />
          <Route path="/:id" element={<ServiceDetails />} />
          <Route path='/documents' element={<Documents />} />

          <Route path='/personalData' element={<PersonalData />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/aboutObjects' element={<AboutObjects />} />
        </Routes>
      </div>
      <NavBar />
    </section>



  )
}

export default App
