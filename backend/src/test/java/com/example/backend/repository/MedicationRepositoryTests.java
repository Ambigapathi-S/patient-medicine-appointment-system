package com.example.backend.repository;

import com.example.backend.entity.Medication;
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
    private Medication medication;
    @BeforeEach
    public void setUp() {
        medication = new Medication();
        medication.setAppointment_id(1L);
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
        Medication medication2 = new Medication();
        medication.setAppointment_id(1L);
        medication.setNotes("Test1");
        medication.setPrescription("Test1");
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
