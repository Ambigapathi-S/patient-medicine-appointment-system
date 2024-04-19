package com.example.backend.repository;

import com.example.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT COUNT(*) FROM Appointment a " +
            "WHERE a.doctorId = :doctorId " +
            "AND a.appointment_date = :date " +
            "AND a.appointment_from_time >= :fromTime " +
            "AND a.appointment_to_time <= :toTime")
    int checkAvailability(Long doctorId, String date, String fromTime, String toTime);

    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :id")
    List<Appointment> findAllAppointmentByDoctorId(Long id);

    @Query("SELECT a FROM Appointment a WHERE a.patientId = :id")
    List<Appointment> findAllAppointmentByPatientId(Long id);

}
