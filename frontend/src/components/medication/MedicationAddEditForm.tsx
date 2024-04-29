import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import {
  findMedicationByAppointmentId,
  saveMedication,
  updateMedication,
} from "../../service/MedicationService";
import {
  getLoggedInUser,
  isAdminUser,
  isDoctorUser,
  logout,
} from "../../service/AuthService";

const MedicationAddEditForm = () => {
  const { id } = useParams();
  let ids = Number(id);
  const [medication_id, setMedicationId] = useState(0);
  const [appointment_id, setAppointmentId] = useState(ids);
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [isAdd, setAdd] = useState(true);

  const navigate = useNavigate();
  const email = getLoggedInUser();
  const isAdmin = isAdminUser();
  const isDoctor = isDoctorUser();
  const [doctorPatientDetails, setDoctorPatientDetails] = useState<any | null>(
    null
  );

  const saveOrUpdateMedication = async (e: any) => {
    e.preventDefault();

    try {
      let response: any = "";
      if (isAdd) {
        const medication = {
          appointment: { id: appointment_id },
          prescription,
          notes,
        };
        response = await saveMedication(medication);
      } else {
        let id = medication_id;
        const medication = {
          id,
          appointment: { id: appointment_id },
          prescription,
          notes,
        };
        response = await updateMedication(id, medication);
      }
      if (response.status === 200 || response.status === 201) {
        if (isAdmin) {
          navigate(`/medication/list`);
        } else {
          navigate(`/doctor/my-appointments?email=${email}`);
        }
      }
    } catch (error: any) {
      if (error?.response?.status == 403) {
        logout();
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (ids) {
          const response = await findMedicationByAppointmentId(ids);
          if (response.data.length > 0) {
            setPrescription(response.data[0].prescription);
            setNotes(response.data[0].notes);
            setAppointmentId(response.data[0].appointment.id);
            setMedicationId(response.data[0].id);
            setDoctorPatientDetails(response.data[0]);
            setAdd(false);
          } else {
            setAdd(true);
          }
        }
      } catch (error: any) {
        if (error?.response?.status == 403) {
          logout();
          navigate("/login");
        } else {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [ids]);
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
      <div className="FormUI ViewDoctorDetails">
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title">Medication Details</h3>
          <button onClick={() => checkRedirects()} className="btn btn-back">
            Back to List
          </button>
        </div>
        <div className="card-body">
          {!isAdd && (
            <div className="ViewDoctorDetails medicationDetailView">
              <Row>
                <Col xs={12} md={6} sm={6} lg={6}>
                  <p>
                    <label>Patient Name : </label>
                    <span>
                      {doctorPatientDetails?.appointment?.patient?.fullName}
                    </span>
                  </p>
                  <p>
                    <label>Type of Sick : </label>
                    <span>
                      {
                        doctorPatientDetails?.appointment?.patient
                          ?.medicalHistory
                      }
                    </span>
                  </p>
                  <p>
                    <label>Address : </label>
                    <span>
                      {doctorPatientDetails?.appointment?.patient?.address}
                    </span>
                  </p>
                  <p>
                    <label>Phone Number : </label>
                    <span>
                      {doctorPatientDetails?.appointment?.patient?.phoneNumber}
                    </span>
                  </p>
                </Col>
                <Col xs={12} md={6} sm={6} lg={6}>
                  <p>
                    <label>Date of Appointment : </label>
                    <span>
                      {doctorPatientDetails?.appointment?.appointment_date}
                    </span>
                  </p>
                  <p>
                    <label>Doctor Name : </label>
                    <span>
                      {doctorPatientDetails?.appointment?.doctor?.fullName}
                    </span>
                  </p>
                  <p>
                    <label>Address : </label>
                    <span>
                      {doctorPatientDetails?.appointment?.doctor?.address}
                    </span>
                  </p>
                  <p>
                    <label>Phone Number : </label>
                    <span>
                      {doctorPatientDetails?.appointment?.doctor?.phoneNumber}
                    </span>
                  </p>
                </Col>
              </Row>
            </div>
          )}
          <form>
            <div className="form-group mt-3">
              <label className="form-label">Prescription</label>

              <textarea
                className="form-control"
                placeholder="Enter Prescription"
                name="prescription"
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group mt-3">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                placeholder="Enter Notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group mt-3 text-center">
              <button
                className="btn btn-success"
                onClick={(e) => saveOrUpdateMedication(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default MedicationAddEditForm;
