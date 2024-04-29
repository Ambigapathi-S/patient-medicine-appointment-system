import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllMedication } from "../../service/MedicationService";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CiViewList } from "react-icons/ci";
import { logout } from "../../service/AuthService";

const MedicationList = () => {
  const [medicationList, setMedicationList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    callMedicationListApi();
  }, []);

  const callMedicationListApi = async () => {
    try {
      const response = await getAllMedication();
      setMedicationList(response.data);
    } catch (error: any) {
      if (error?.response?.status == 403) {
        logout();
        navigate("/login");
      } else {
        console.log(error);
      }
    }
  };

  function viewMedication(id: number) {
    navigate(`/medication/view/${id}`);
  }

  return (
    <Container>
      <div className="doctorList">
        <h3 className="title-h3">Medication's List</h3>
        <div className="table-responsive">
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Appointment ID</th>
                <th>Appointment Date</th>
                <th>Doctor Name - ID</th>
                <th>Patient Name - ID</th>
                <th>Prescription</th>
                <th>Notes</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {medicationList.map((medication: any, index) => (
                <tr key={medication.id}>
                  <td>{index + 1}</td>
                  <td>{medication.appointment.id}</td>
                  <td>{medication.appointment.appointment_date}</td>
                  <td>
                    {medication.appointment.doctor.fullName} -{" "}
                    {medication.appointment.doctor.id}
                  </td>
                  <td>
                    {medication.appointment.patient.fullName} -{" "}
                    {medication.appointment.patient.id}
                  </td>
                  <td>{medication.prescription}</td>
                  <td>{medication.notes}</td>
                  <td className="text-center">
                    <span className="view tooltip">
                      <button onClick={() => viewMedication(medication.id)}>
                        <span className="icon">
                          <CiViewList />
                        </span>
                        <span className="tooltiptext">View</span>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
              {!medicationList.length && (
                <tr>
                  <td colSpan={8} className="text-center">
                    No Medication's Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default MedicationList;
