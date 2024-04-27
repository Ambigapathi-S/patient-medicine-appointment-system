import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getLoggedInUser,
  isAdminUser,
  isDoctorUser,
  isPatientUser,
  logout,
} from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";
import {
  findMedicationByAppointmentId,
  getMedicationById,
} from "../../service/MedicationService";

const MedicationView = () => {
  const { id } = useParams();
  let ids: number = Number(id);
  const email = getLoggedInUser();
  const navigate = useNavigate();
  const [medicationDetails, setMedicationDetails] = useState<any | null>(null);
  const isAdmin = isAdminUser();
  const isDoctor = isDoctorUser();
  const isPatient = isPatientUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ids) {
          if (isDoctor || isPatient) {
            const response = await findMedicationByAppointmentId(ids);
            if (response.data) {
              setMedicationDetails(response.data[0]);
            }
          }
          if (isAdmin) {
            const response = await getMedicationById(ids);
            if (response.data) {
              setMedicationDetails(response.data);
            }
          }
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(error);
        }
      }
    };
    fetchData();
  }, [id]);

  function checkRedirects() {
    if (isAdmin) {
      navigate(`/medication/list`);
    } else if (isDoctor) {
      navigate(`/doctor/my-appointments?email=${email}`);
    } else {
      navigate(`/patient/my-appointments?email=${email}`);
    }
  }
  return (
    <Container>
      <ToastContainer />
      <div className="ViewDoctorDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3>Medication Details #{medicationDetails?.id}</h3>
          <button onClick={() => checkRedirects()} className="btn btn-back">
            Back to List
          </button>
        </div>
        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Patient Name : </label>
              <span>{medicationDetails?.appointment?.patient?.fullName}</span>
            </p>
            <p>
              <label>Type of Sick : </label>
              <span>
                {medicationDetails?.appointment?.patient?.medicalHistory}
              </span>
            </p>
            <p>
              <label>Address : </label>
              <span>{medicationDetails?.appointment?.patient?.address}</span>
            </p>
            <p>
              <label>Phone Number : </label>
              <span>
                {medicationDetails?.appointment?.patient?.phoneNumber}
              </span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Date of Appointment : </label>
              <span>{medicationDetails?.appointment?.appointment_date}</span>
            </p>
            <p>
              <label>Doctor Name : </label>
              <span>{medicationDetails?.appointment?.doctor?.fullName}</span>
            </p>
            <p>
              <label>Address : </label>
              <span>{medicationDetails?.appointment?.doctor?.address}</span>
            </p>
            <p>
              <label>Phone Number : </label>
              <span>{medicationDetails?.appointment?.doctor?.phoneNumber}</span>
            </p>
          </Col>
        </Row>
        <h1 className="prescriptionDetails">Prescription Details</h1>
        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Prescription : </label>
              <span>{medicationDetails?.prescription}</span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Notes : </label>
              <span>{medicationDetails?.notes}</span>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default MedicationView;
