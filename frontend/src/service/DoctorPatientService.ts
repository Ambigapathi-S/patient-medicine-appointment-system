import axios from "axios";
import { getToken } from "./AuthService";

const AUTH_REST_API_URL = "http://localhost:8080/api";

axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// doctor CRUD api 

export const getDoctorList = () =>
  axios.get(AUTH_REST_API_URL + "/doctor-list");

export const getDoctorById = (id: string) =>
  axios.get(AUTH_REST_API_URL + "/doctor-list/" + id);

export const getDoctorByEmail = (email: string) =>
  axios.get(AUTH_REST_API_URL + "/doctor/my-profile?email=" + email);

export const editDoctorDetails = (id:number, registerObj: any) =>
  axios.put(AUTH_REST_API_URL + "/doctor/my-profile/" + id, registerObj);

export const deleteDoctor = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/doctor/delete/" + id);


// patient CRUD api

export const getPatientList = () =>
  axios.get(AUTH_REST_API_URL + "/patient-list");

export const getPatientById = (id: string) =>
  axios.get(AUTH_REST_API_URL + "/patient-list/" + id);

export const getPatientByEmail = (email: string) =>
  axios.get(AUTH_REST_API_URL + "/patient/my-profile?email=" + email);

export const editpatientDetail = (id:number, registerObj: any) =>
  axios.put(AUTH_REST_API_URL + "/patient/my-profile/" + id, registerObj);

export const deletePatient = (id: number) =>
  axios.delete(AUTH_REST_API_URL + "/patient/delete/" + id);
