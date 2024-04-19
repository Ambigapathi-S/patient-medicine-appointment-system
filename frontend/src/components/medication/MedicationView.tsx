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
import { findMedicationByAppointmentId, getMedicationById } from "../../service/MedicationService";

const MedicationView = () => {
  const { id } = useParams();
  let ids: number = Number(id);
  const email = getLoggedInUser();
  const navigate = useNavigate();
  const [medicationDetails, setMedicationDetails] = useState({
    id: "",
    appointment_id: "",
    prescription: "",
    notes: "",
  });
  const isAdmin = isAdminUser();
  const isDoctor = isDoctorUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ids) {
          if (isDoctor) {
            const response = await findMedicationByAppointmentId(ids);
            if (response.data) {
              setMedicationDetails(response.data);
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
          <h3>Medication Details #{medicationDetails.id}</h3>
          <button onClick={() => checkRedirects()} className="btn btn-back">
            Back to List
          </button>
        </div>
        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Id : </label>
              <span>{medicationDetails.id}</span>
            </p>
            <p>
              <label>Appointment ID : </label>
              <span>{medicationDetails.appointment_id}</span>
            </p>
            <p>
              <label>Prescription : </label>
              <span>{medicationDetails.prescription}</span>
            </p>
            <p>
              <label>Notes : </label>
              <span>{medicationDetails.notes}</span>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default MedicationView;
