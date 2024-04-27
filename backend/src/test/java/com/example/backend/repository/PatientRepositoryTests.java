package com.example.backend.repository;

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
public class PatientRepositoryTests {
    @Autowired
    private PatientRepository patientRepository;
    private Patient patient;
    @BeforeEach
    public void setUp() {
        patient = new Patient();
        patient.setFullName("Nazi");
        patient.setDob("1997-05-12");
        patient.setGender("Female");
        patient.setAddress("Tirunelveli");
        patient.setPhoneNumber("8745210369");
        patient.setEmail("nazi@gmail.com");
        patient.setBloodGroup("O +ve");
        patient.setMedicalHistory("Fever");
    }
    @Test
    public void givenPatientObject_whenSave_thenReturnSavedPatient() {
        Patient savedPatient = patientRepository.save(patient);

        // Checking - assertion
        assertThat(savedPatient).isNotNull();
        assertThat(savedPatient.getId()).isGreaterThan(0);
    }

    @Test
    public void givenPatientList_whenFindAll_thenReturnPatientList() {
        patientRepository.save(patient);
        Patient patient2 = new Patient();
        patient.setFullName("Sana");
        patient.setDob("1997-05-12");
        patient.setGender("Female");
        patient.setAddress("Tirunelveli");
        patient.setPhoneNumber("8745215669");
        patient.setEmail("sana@gmail.com");
        patient.setBloodGroup("O +ve");
        patient.setMedicalHistory("Fever");
        patientRepository.save(patient2);
        List<Patient> patientList = patientRepository.findAll();

        // Checking - assertion
        assertThat(patientList).isNotNull();
        assertThat(patientList.size()).isEqualTo(2);
    }

    @Test
    public void givenPatientObject_whenFindById_thenReturnPatientObject() {
        Patient savedPatient = patientRepository.save(patient);
        Patient patientDb = patientRepository.findById(savedPatient.getId()).get();
        // Checking - assertion
        assertThat(patientDb).isNotNull();
    }

    @Test
    public void givenPatientObject_whenUpdatePatient_thenReturnUpdatedPatientObject() {
        Patient savedPatient = patientRepository.save(patient);
        Patient patientDb = patientRepository.findById(savedPatient.getId()).get();
        patientDb.setFullName("Naziii");
        Patient updatedPatient = patientRepository.save(patientDb);
        // Checking - assertion
        assertThat(updatedPatient.getFullName()).isEqualTo("Naziii");
    }

    @Test
    public void givenPatientObject_whenDeletePatient_thenRemovePatient() {
        Patient savedPatient = patientRepository.save(patient);
        patientRepository.deleteById(savedPatient.getId());

        Optional<Patient> patientOptional = patientRepository.findById(savedPatient.getId());

        // Checking - assertion
        assertThat(patientOptional).isEmpty();
    }
}
