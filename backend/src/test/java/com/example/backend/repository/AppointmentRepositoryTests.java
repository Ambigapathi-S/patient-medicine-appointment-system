package com.example.backend.repository;
import com.example.backend.entity.Appointment;
import com.example.backend.entity.Doctor;
import com.example.backend.entity.Patient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;

@DataJpaTest
public class AppointmentRepositoryTests {
    private AppointmentRepository appointmentRepository;
    private DoctorRepository doctorRepository;
    private PatientRepository patientRepository;

    private Appointment appointment;
    @BeforeEach
    public void setUp() {
        Doctor doctor = new Doctor();
        doctor.setFullName("Ambiga");
        doctor.setDob("1999-12-06");
        doctor.setGender("Female");
        doctor.setAddress("Tirunelveli");
        doctor.setPhoneNumber("9874562103");
        doctor.setEmail("ambiga@gmail.com");
        doctor.setDesignation("Full stack dev");
        doctor.setSpecialization("frontend");
        doctor.setYearsOfExp("3");
        doctor.setPassword("$10$/YWECaOT8OAaPTeRFCiapehbCCVtpzKPEbOmnTCXmx2aiB1oAfObu");
        doctor.setConsultingFees(Long.valueOf("500"));
        doctor.setConsultingHrs(Long.valueOf("30"));
        doctor.setAvailabilityFromTime("10:00");
        doctor.setAvailabilityToTime("14:00");
        doctor.setStatus("pending");

        Patient patient = new Patient();
        patient.setFullName("Nazi");
        patient.setDob("1999-12-06");
        patient.setGender("Female");
        patient.setAddress("Kerala");
        patient.setPhoneNumber("9874512036");
        patient.setEmail("nazi@gmail.com");
        patient.setBloodGroup("O+ve");
        patient.setMedicalHistory("Fever");

        appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointment_date("2024-05-01");
        appointment.setAppointment_from_time("10:00");
        appointment.setAppointment_to_time("10:30");
        appointment.setAppointment_type("Direct");
        appointment.setAppointment_status("pending");
    }
    @Test
    public void givenAppointmentObject_whenSave_thenReturnSavedAppointment() {
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Checking - assertion
        assertThat(savedAppointment).isNotNull();
        assertThat(savedAppointment.getId()).isGreaterThan(0);
    }


    @Test
    public void givenAppointmentList_whenFindAll_thenReturnAppointmentList() {

        Doctor doctor = new Doctor();
        doctor.setFullName("Raji");
        doctor.setDob("1999-12-18");
        doctor.setGender("Female");
        doctor.setAddress("Tirunelveli");
        doctor.setPhoneNumber("9874789103");
        doctor.setEmail("raji@gmail.com");
        doctor.setDesignation("Full stack dev");
        doctor.setSpecialization("frontend");
        doctor.setYearsOfExp("3");
        doctor.setPassword("$10$/YWECaOT8OAaPTeRFCiapehbCCVtpzKPEbOmnTCXmx2aiB1oAfObu");
        doctor.setConsultingFees(Long.valueOf("500"));
        doctor.setConsultingHrs(Long.valueOf("30"));
        doctor.setAvailabilityFromTime("10:00");
        doctor.setAvailabilityToTime("14:00");
        doctor.setStatus("pending");

        Patient patient = new Patient();
        patient.setFullName("Sana");
        patient.setDob("1999-12-10");
        patient.setGender("Female");
        patient.setAddress("Kerala");
        patient.setPhoneNumber("9874512047");
        patient.setEmail("sana@gmail.com");
        patient.setBloodGroup("O+ve");
        patient.setMedicalHistory("Fever");

        appointmentRepository.save(appointment);
        Appointment appointment2 = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointment_date("2024-05-02");
        appointment.setAppointment_from_time("10:00");
        appointment.setAppointment_to_time("15:00");
        appointment.setAppointment_type("Direct");
        appointment.setAppointment_status("pending");
        appointmentRepository.save(appointment2);
        List<Appointment> appointmentList = appointmentRepository.findAll();

        // Checking - assertion
        assertThat(appointmentList).isNotNull();
        assertThat(appointmentList.size()).isEqualTo(2);
    }

    @Test
    public void givenAppointmentObject_whenFindById_thenReturnAppointmentObject() {
        Appointment savedAppointment = appointmentRepository.save(appointment);
        Appointment appointmentDb = appointmentRepository.findById(savedAppointment.getId()).get();
        // Checking - assertion
        assertThat(appointmentDb).isNotNull();
    }


    @Test
    public void givenAppointmentObject_whenDeleteAppointment_thenRemoveAppointment() {
        Appointment savedAppointment = appointmentRepository.save(appointment);
        appointmentRepository.deleteById(savedAppointment.getId());

        Optional<Appointment> appointmentOptional = appointmentRepository.findById(savedAppointment.getId());

        // Checking - assertion
        assertThat(appointmentOptional).isEmpty();
    }
}
