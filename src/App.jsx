import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'

import NavBar from './Components/NavBar'
import Services from './Components/Screens/Services'
import PersonalData from './Components/Screens/PersonalData'
import Profile from './Components/Screens/Profile'
import AboutObjects from './Components/Screens/AboutObjects'
import ServiceDetails from './Components/Screens/ServiceDetails';
import RegistrationPage from './Components/Screens/RegistrationPage';
import LoginRegistrSkelet from './Components/Screens/LoginRegistrSkelet';
import LoginPage from './Components/Screens/LoginPage';
import UserDocuments from './Components/Screens/UserDocuments'
import useAuth from './Hooks/useAuth';
import ConfirmPassord from './Components/Screens/ConfirmPassord';
import DocumentsSkelet from './Components/Screens/DocumentsSkelet';
import CompanyDocuments from './Components/Screens/CompanyDocuments';
import NoneAutorisation from './Components/Screens/NoneAutorisation';

function App() {
  const { auth } = useAuth();
  const token = auth.token;
  return (
    <section className='w-screen h-screen overflow-x-hidden '>
      <div className=' h-full px-3 md:px-5 pt-12 lg:px-40 '>
        <Routes>
          <Route path='/' element={<Services />} />
          <Route path="/:id" element={<ServiceDetails />} />

          <Route path='/userDocuments' element={<DocumentsSkelet>
            <UserDocuments />
          </DocumentsSkelet>} />
          <Route path='/companyDocuments' element={<DocumentsSkelet>
            <CompanyDocuments />
          </DocumentsSkelet>} />


          <Route path='/registration' element={
            <LoginRegistrSkelet>
              <RegistrationPage />
            </LoginRegistrSkelet>} />
          <Route path='/confirm' element={
            <LoginRegistrSkelet>
              <ConfirmPassord />
            </LoginRegistrSkelet>} />

          <Route path='/login' element={
            <LoginRegistrSkelet>
              <LoginPage />
            </LoginRegistrSkelet>} />
          <Route path='/noneuser' element={<NoneAutorisation />} />

          <Route path='/personalData' element={<PersonalData user={token} />} />
          <Route path='/profile' element={<Profile user={token} />} />
          <Route path='/aboutObjects' element={<AboutObjects user={token} />} />
        </Routes>
      </div>
      <NavBar />
    </section>



  )
}

export default App
