import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import Layout from "./components/Layout";
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/auth/LoginComponent";
import PatientRegister from "./components/auth/PatientRegister";
import DoctorRegister from "./components/auth/DoctorRegister";
import ScheduleAppointment from "./components/patient/ScheduleAppointment";
import PageNotFound from "./components/common/PageNotFound";
import DoctorView from "./components/doctor/DoctorView";
import DoctorProfile from "./components/doctor/DoctorProfile";
import PatientProfile from "./components/patient/PatientProfile";
import { isUserLoggedIn } from "./service/AuthService";
import PatientAppointments from "./components/patient/PatientAppointments";
import DoctorAppointments from "./components/doctor/DoctorAppointments";
import DoctorList from "./components/doctor/DoctorList";
import MedicationList from "./components/medication/MedicationList";
import PatientList from "./components/patient/PatientList";
import AppointmentList from "./components/appointment/AppointmentList";
import PatientView from "./components/patient/PatientView";
import AppointmentView from "./components/appointment/AppointmentView";
import MedicationAddEditForm from "./components/medication/MedicationAddEditForm";
import MedicationView from "./components/medication/MedicationView";

function App() {
  function AuthenticatedRoute({ children }: any) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeComponent />}></Route>
          <Route path="/home" element={<HomeComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          
          <Route path="/doctor/list" element={<DoctorList />}></Route>
          <Route path="/medication/list" element={<AuthenticatedRoute><MedicationList /></AuthenticatedRoute>}></Route>
          <Route path="/patient/list" element={<AuthenticatedRoute><PatientList /></AuthenticatedRoute>}></Route>
          
          <Route path="/appointment/list" element={<AuthenticatedRoute><AppointmentList /></AuthenticatedRoute>}></Route>
          <Route path="/appointment/view/:id" element={<AuthenticatedRoute><AppointmentView /></AuthenticatedRoute>}></Route>

          
          <Route path="/doctor-register" element={<DoctorRegister />}></Route>
          <Route path="/doctor/my-profile" element={<AuthenticatedRoute><DoctorProfile /></AuthenticatedRoute>}></Route>
          <Route path="/doctor/my-appointments" element={<AuthenticatedRoute><DoctorAppointments /></AuthenticatedRoute>}></Route>
          <Route path="/doctor/view/:id" element={<AuthenticatedRoute><DoctorView /></AuthenticatedRoute>}></Route>
          <Route path="/doctor/update/:id" element={<AuthenticatedRoute><DoctorProfile /></AuthenticatedRoute>}></Route>


          <Route path="/patient-register" element={<PatientRegister />}></Route>
          <Route path="/patient/my-profile" element={<AuthenticatedRoute><PatientProfile /></AuthenticatedRoute>}></Route>
          <Route path="/patient/my-appointments" element={<AuthenticatedRoute><PatientAppointments /></AuthenticatedRoute>}></Route>
          <Route path="/patient/view/:id" element={<AuthenticatedRoute><PatientView /></AuthenticatedRoute>}></Route>
          <Route path="/patient/update/:id" element={<AuthenticatedRoute><PatientProfile /></AuthenticatedRoute>}></Route>

          <Route path="/medication/update/:id" element={<AuthenticatedRoute><MedicationAddEditForm /></AuthenticatedRoute>}></Route>
          <Route path="/medication/view/:id" element={<AuthenticatedRoute><MedicationView /></AuthenticatedRoute>}></Route>

          <Route path="/schedule-appointment" element={<AuthenticatedRoute><ScheduleAppointment /></AuthenticatedRoute>}></Route>
          
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
