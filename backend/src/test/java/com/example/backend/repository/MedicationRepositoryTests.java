package com.example.backend.repository;

import com.example.backend.entity.Appointment;
import com.example.backend.entity.Doctor;
import com.example.backend.entity.Medication;
import com.example.backend.entity.Patient;
import com.example.backend.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;

@DataJpaTest
public class MedicationRepositoryTests {
    @Autowired
    private MedicationRepository medicationRepository;
    private AppointmentRepository appointmentRepository;
    private Medication medication;
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

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointment_date("2024-05-01");
        appointment.setAppointment_from_time("10:00");
        appointment.setAppointment_to_time("10:30");
        appointment.setAppointment_type("Direct");
        appointment.setAppointment_status("pending");

        medication = new Medication();
        medication.setAppointment(appointment);
        medication.setNotes("Test");
        medication.setPrescription("Test");
    }
    @Test
    public void givenMedicationObject_whenSave_thenReturnSavedMedication() {
        Medication savedMedication = medicationRepository.save(medication);

        // Checking - assertion
        assertThat(savedMedication).isNotNull();
        assertThat(savedMedication.getId()).isGreaterThan(0);
    }

    @Test
    public void givenMedicationList_whenFindAll_thenReturnMedicationList() {
        medicationRepository.save(medication);
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

        Appointment appointment = new Appointment();
        appointment.setDoctor(doctor);
        appointment.setPatient(patient);
        appointment.setAppointment_date("2024-05-01");
        appointment.setAppointment_from_time("11:00");
        appointment.setAppointment_to_time("11:30");
        appointment.setAppointment_type("Direct");
        appointment.setAppointment_status("pending");

        Medication medication2 = new Medication();
        medication2.setAppointment(appointment);
        medication2.setNotes("Test");
        medication2.setPrescription("Test");

        medicationRepository.save(medication2);
        List<Medication> medicationList = medicationRepository.findAll();

        // Checking - assertion
        assertThat(medicationList).isNotNull();
        assertThat(medicationList.size()).isEqualTo(2);
    }

    @Test
    public void givenMedicationObject_whenFindById_thenReturnMedicationObject() {
        Medication savedMedication = medicationRepository.save(medication);
        Medication medicationDb = medicationRepository.findById(savedMedication.getId()).get();
        // Checking - assertion
        assertThat(medicationDb).isNotNull();
    }

    @Test
    public void givenMedicationObject_whenUpdateMedication_thenReturnUpdatedMedicationObject() {
        Medication savedMedication = medicationRepository.save(medication);
        Medication medicationDb = medicationRepository.findById(savedMedication.getId()).get();
        medicationDb.setPrescription("test test");
        Medication updatedMedication = medicationRepository.save(medicationDb);
        // Checking - assertion
        assertThat(updatedMedication.getPrescription()).isEqualTo("test test");
    }

    @Test
    public void givenMedicationObject_whenDeleteMedication_thenRemoveMedication() {
        Medication savedMedication = medicationRepository.save(medication);
        medicationRepository.deleteById(savedMedication.getId());

        Optional<Medication> medicationOptional = medicationRepository.findById(savedMedication.getId());

        // Checking - assertion
        assertThat(medicationOptional).isEmpty();
    }
}
