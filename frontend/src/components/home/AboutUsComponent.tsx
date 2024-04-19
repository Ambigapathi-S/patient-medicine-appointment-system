import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AboutUsComponent = () => {
  return (
    <section className="AboutSection">
      <Container>
        <Row>
          <Col className="aboutus__content" md={6} lg={6} xs={12} sm={12}>
            <div className="item">
              <h1>
                Welcome to <span>Mindful Medicine</span>
              </h1>
              <p>
                Mindful Medicine provides total health care to its patients,
                with the highest levels of skill, professionalism, and ethical
                practice, leading to their effective care and treatment at
                affordable costs. PSG Hospitals facilitates medical education
                and research and is committed to continuous quality improvement.
              </p>
            </div>
          </Col>
          <Col md={6} lg={6} xs={12} sm={12}>
            <img
              src={`${process.env.PUBLIC_URL + "/images/doctors.jpeg"}`}
              alt="doctors"
              className="doctorImg"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUsComponent;
