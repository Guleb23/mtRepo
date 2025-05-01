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
          {/* Открытые маршруты */}
          <Route path='/' element={<Services />} />
          <Route path="/:id" element={<ServiceDetails />} />
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

          {/* Доступно только для роли 1 */}
          <Route path='/documents' element={
            <PrivateRoute allowedRoles={["1"]}>
              <DocumentsSkelet />
            </PrivateRoute>
          }>
            <Route path='userDocuments' element={<UserDocuments />} />
            <Route path='companyDocuments' element={<CompanyDocuments />} />
            <Route path='noneuser' element={<NoneAutorisation text={`Тут будут храниться документы`} />} />
          </Route>

          <Route path='/personalData' element={
            <PrivateRoute allowedRoles={["1"]}>
              <AppSkelet path={`/personalData`} title={`Персональные данные`} />
            </PrivateRoute>
          }>
            <Route index element={<PersonalData user={token} />} />
            <Route path='noneuser' element={<NoneAutorisation text={`Тут будут ваши персональные данные`} />} />
          </Route>

          <Route path='/profile' element={
            <PrivateRoute allowedRoles={["1"]}>
              <AppSkelet path={`/profile`} title={`Профиль`} />
            </PrivateRoute>
          }>
            <Route index element={<Profile user={token} />} />
            <Route path='noneuser' element={<NoneAutorisation text={`Тут будут данные вашего профиля`} />} />
          </Route>

          <Route path='/aboutObjects' element={
            <PrivateRoute allowedRoles={["1"]}>
              <AboutObjects user={token} />
            </PrivateRoute>
          } />

          {/* Только для роли 2 */}
          <Route path='/manager' element={
            <PrivateRoute allowedRoles={["2"]}>
              <ManagerPanel />
            </PrivateRoute>
          } />
        </Routes>

      </div>
      <NavBar />
    </section>



  )
}

export default App
