import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../service/AuthService";
import { Col, Row, Table } from "react-bootstrap";
import { getAppointmentsByPatientId } from "../../service/AppointmentService";
import { getPatientByEmail } from "../../service/DoctorPatientService";
import { CiViewList } from "react-icons/ci";

const PatientAppointments = () => {
  const location = useLocation();
  const [appointmentDet, setAppointmentDet]: any = useState([]);
  let patientId: number;
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParameters = searchParams.getAll("email");
    if (queryParameters.length > 0) {
      const emailAddr: string = queryParameters[0];
      fetchPatientDetails(emailAddr);
    }
  }, [location]);

  const fetchPatientDetails = async (email: string) => {
    try {
      if (email) {
        const response = await getPatientByEmail(email);
        patientId = response.data.id;
        fetchData(patientId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async (patientId: number) => {
    try {
      if (patientId) {
        const response = await getAppointmentsByPatientId(patientId);
        setAppointmentDet(response.data);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        logout();
        navigate("/login");
      } else {
        let resMsg = error?.response?.data?.message;
        toast(resMsg);
      }
    }
  };
  function viewPrescription(id:number) {
    navigate(`/medication/view/${id}`);
  }
  return (
    <Container>
      <ToastContainer />
      <div className="RegisterFormUI FormUI">
        <h3 className="title">My Appointments</h3>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Appointment Date</th>
              <th>From Time</th>
              <th>To Time</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointmentDet.map((appointment: any, index: number) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.appointment_date}</td>
                <td>{appointment.appointment_from_time}</td>
                <td>{appointment.appointment_to_time}</td>
                <td>{appointment.appointment_type}</td>
                <td>{appointment.appointment_status}</td>
                <td className="text-center">
                  {appointment.appointment_status == "Completed" && (
                    <span className="view tooltip">
                      <button onClick={() => viewPrescription(appointment.id)}>
                        <span className="icon">
                          <CiViewList />
                        </span>
                        <span className="tooltiptext">Prescription</span>
                      </button>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default PatientAppointments;
