import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById } from "../../service/DoctorPatientService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { logout } from "../../service/AuthService";
import { ToastContainer, toast } from "react-toastify";

const PatientView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState({
    id: "",
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    phoneNumber: "",
    email: "",
    bloodGroup: "",
    medicalHistory: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getPatientById(id);
          setPatientDetails(response.data);
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

  return (
    <Container>
      <ToastContainer />
      <div className="ViewDoctorDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3>Patient Details #{patientDetails.id}</h3>
          <a href="/patient/list" className="btn btn-back"> Back to List</a>
        </div>
        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Full Name : </label>
              <span>{patientDetails.fullName}</span>
            </p>
            <p>
              <label>Date of Birth : </label>
              <span>{patientDetails.dob}</span>
            </p>
            <p>
              <label>Gender : </label>
              <span>{patientDetails.gender}</span>
            </p>
            <p>
              <label>Address : </label>
              <span>{patientDetails.address}</span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Phone Number : </label>
              <span>{patientDetails.phoneNumber}</span>
            </p>
            <p>
              <label>Email Address : </label>
              <span>{patientDetails.email}</span>
            </p>
            <p>
              <label>Blood Group : </label>
              <span>{patientDetails.bloodGroup}</span>
            </p>
            <p>
              <label>Medical History : </label>
              <span>{patientDetails.medicalHistory}</span>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PatientView;
