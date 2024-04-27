package com.example.backend.repository;
import com.example.backend.entity.Doctor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;

@DataJpaTest
public class DoctorRepositoryTests {
    @Autowired
    private DoctorRepository doctorRepository;
    private Doctor doctor;
    @BeforeEach
    public void setUp() {
        doctor = new Doctor();
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
    }
    @Test
    public void givenDoctorObject_whenSave_thenReturnSavedDoctor() {
        Doctor savedDoctor = doctorRepository.save(doctor);

        // Checking - assertion
        assertThat(savedDoctor).isNotNull();
        assertThat(savedDoctor.getId()).isGreaterThan(0);
    }

    @Test
    public void givenDoctorList_whenFindAll_thenReturnDoctorList() {
        doctorRepository.save(doctor);
        Doctor doctor2 = new Doctor();
        doctor.setFullName("Raji");
        doctor.setDob("1999-12-06");
        doctor.setGender("Female");
        doctor.setAddress("Tirunelveli");
        doctor.setPhoneNumber("9874562102");
        doctor.setEmail("raji@gmail.com");
        doctor.setDesignation("Full stack dev");
        doctor.setSpecialization("frontend");
        doctor.setYearsOfExp("3");
        doctor.setPassword("$10$/wewECaOT8OAaPTeRFCiapehbCCVtpzKPEbOmnTCXmx2aiB1oAfObu");
        doctor.setConsultingFees(Long.valueOf("500"));
        doctor.setConsultingHrs(Long.valueOf("30"));
        doctor.setAvailabilityFromTime("10:00");
        doctor.setAvailabilityToTime("14:00");
        doctor.setStatus("pending");
        doctorRepository.save(doctor2);
        List<Doctor> doctorList = doctorRepository.findAll();

        // Checking - assertion
        assertThat(doctorList).isNotNull();
        assertThat(doctorList.size()).isEqualTo(2);
    }

    @Test
    public void givenDoctorObject_whenFindById_thenReturnDoctorObject() {
        Doctor savedDoctor = doctorRepository.save(doctor);
        Doctor doctorDb = doctorRepository.findById(savedDoctor.getId()).get();
        // Checking - assertion
        assertThat(doctorDb).isNotNull();
    }

    @Test
    public void givenDoctorObject_whenUpdateDoctor_thenReturnUpdatedDoctorObject() {
        Doctor savedDoctor = doctorRepository.save(doctor);
        Doctor doctorDb = doctorRepository.findById(savedDoctor.getId()).get();
        doctorDb.setFullName("Ambiga");
        Doctor updatedDoctor = doctorRepository.save(doctorDb);
        // Checking - assertion
        assertThat(updatedDoctor.getFullName()).isEqualTo("Ambiga");
    }

    @Test
    public void givenDoctorObject_whenDeleteDoctor_thenRemoveDoctor() {
        Doctor savedDoctor = doctorRepository.save(doctor);
        doctorRepository.deleteById(savedDoctor.getId());

        Optional<Doctor> doctorOptional = doctorRepository.findById(savedDoctor.getId());

        // Checking - assertion
        assertThat(doctorOptional).isEmpty();
    }
}
