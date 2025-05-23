import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute'; // <-- добавь импорт
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
import AppSkelet from './Components/Screens/AppSkelet';
import ManagerPanel from './Components/Screens/ManagerPanel';
import CustomLoader from './Components/CustomLoader';

function App() {
  const { auth, loading } = useAuth(); // Получаем isLoading

  if (loading) {
    return <CustomLoader />
  }
  const token = auth.token;
  return (
    <section className='w-screen h-screen overflow-x-hidden overflow-y-auto bg-[#F7FAFC] '>
      <div className=' h-full px-3 md:px-5 pt-12 lg:px-40 '>
        <Routes>
          <Route path='/' element={<Services />} />
          <Route path="/:id" element={<ServiceDetails />} />
          <Route path='/documents' element={<DocumentsSkelet />}>
            <Route path='userDocuments' element={<UserDocuments />} />
            <Route path='companyDocuments' element={<CompanyDocuments />} />
            <Route path='noneuser' element={<NoneAutorisation text={`Тут будут храниться документы`} />} />
          </Route>

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

          <Route path='/personalData' element={<AppSkelet path={`/personalData`} title={`Персональные данные`} />}>
            <Route index element={<PersonalData user={token} />} />
            <Route path='noneuser' element={<NoneAutorisation text={`Тут будут ваши персональные данные`} />} />
          </Route>
          <Route path='/profile' element={<AppSkelet path={`/profile`} title={`Профиль`} />}>
            <Route index element={<Profile user={token} />} />
            <Route path='noneuser' element={<NoneAutorisation text={`Тут будут данные вашего профиля`} />} />
          </Route>

          <Route path='/aboutObjects' element={<AboutObjects user={token} />} />
          <Route
            path='/manager'
            element={
              auth?.role === 2 ? (
                <ManagerPanel />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
      <NavBar />
    </section>



  )
}

export default App
