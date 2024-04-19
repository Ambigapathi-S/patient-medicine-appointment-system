import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { ToastContainer } from "react-toastify";
import {
  findMedicationByAppointmentId,
  saveMedication,
  updateMedication,
} from "../../service/MedicationService";
import { getLoggedInUser, isAdminUser } from "../../service/AuthService";

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
  
  const saveOrUpdateMedication = async (e: any) => {
    e.preventDefault();

    

    try {
      let response:any = "";
      if (isAdd) {
        const medication = { appointment_id, prescription, notes };
        response = await saveMedication(medication);
      } else {
        let id = medication_id;
        const medication = { id, appointment_id, prescription, notes };
        response = await updateMedication(id, medication);
      }
      if (response.status === 200 || response.status === 201) {
        if (isAdmin) {
          navigate(`/medication/list`);
        } else {
          navigate(`/doctor/my-appointments?email=${email}`);
        }
      }
    } catch (error) {
      console.error(error);
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
            setAppointmentId(ids);
            setMedicationId(response.data[0].id);
            setAdd(false);
          } else {
            setAdd(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [ids]);

 
  return (
    <Container>
      <ToastContainer />
      <div className="FormUI">
        <h3 className="title">Medication Details</h3>
        <div className="card-body">
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
