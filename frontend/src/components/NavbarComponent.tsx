import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  isUserLoggedIn,
  logout,
  isPatientUser,
  isDoctorUser,
  getLoggedInUser,
  isAdminUser,
} from "../service/AuthService";
import { useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";

const NavbarComponent = () => {
  const isAuth = isUserLoggedIn();
  const isPatient = isPatientUser();
  const isDoctor = isDoctorUser();
  const isAdmin = isAdminUser();
  const navigate = useNavigate();
  const email = getLoggedInUser();
  function handlLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Navbar expand="lg">
      <Container className="justify-content-between">
        <Navbar.Brand href="/">
          Mindful <span>Medicine</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            {!isAuth && <Nav.Link href="/login">Login</Nav.Link>}
            {!isAuth && <Nav.Link href="/patient-register" className="link-btn">Patient Registration</Nav.Link>}
            {!isAuth && <Nav.Link href="/doctor-register" className="link-btn">Doctor Registration</Nav.Link>}
            {isAuth && isPatient && <Nav.Link href="/schedule-appointment">Schedule Appointment</Nav.Link>}

            {isAuth && (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <FaRegUserCircle /> Settings
                  {isAdmin && <span>(Admin)</span>}
                  {isDoctor && <span>(Doctor)</span>}
                  {isPatient && <span>(Patient)</span>}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {isAdmin && <Dropdown.Item href={`/doctor/list`}>Doctor List</Dropdown.Item>}
                  {isAdmin && <Dropdown.Item href={`/patient/list`}>Patient List</Dropdown.Item>}
                  {isAdmin && <Dropdown.Item href={`/appointment/list`}>Appointment List</Dropdown.Item>}
                  {isAdmin && <Dropdown.Item href={`/medication/list`}>Medication List</Dropdown.Item>}

                  {isPatient && <Dropdown.Item href={`/patient/my-profile?email=${email}`}>My Profile</Dropdown.Item>}
                  {isPatient && (
                    <Dropdown.Item href={`/patient/my-appointments?email=${email}`}>My Appointments</Dropdown.Item>)}
                  
                  {isDoctor && <Dropdown.Item href={`/doctor/my-profile?email=${email}`}>My Profile</Dropdown.Item>}
                  {isDoctor && <Dropdown.Item href={`/doctor/my-appointments?email=${email}`}>My Appointments</Dropdown.Item>}
                  
                  <Dropdown.Item onClick={() => handlLogout()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
