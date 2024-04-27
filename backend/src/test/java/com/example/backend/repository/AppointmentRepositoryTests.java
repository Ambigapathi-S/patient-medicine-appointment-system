package com.example.backend.repository;
import com.example.backend.entity.Appointment;
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
    private Appointment appointment;
    @BeforeEach
    public void setUp() {
        appointment = new Appointment();
        appointment.setDoctor().setId(1L);
        appointment.setPatient().setId(1L);
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
        appointmentRepository.save(appointment);
        Appointment appointment2 = new Appointment();
        appointment.setDoctorId(2L);
        appointment.setPatientId(2L);
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
