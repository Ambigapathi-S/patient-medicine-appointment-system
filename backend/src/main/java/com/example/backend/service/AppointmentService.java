package com.example.backend.service;

import com.example.backend.dto.AppointmentDto;
import com.example.backend.entity.Appointment;

import java.util.List;

public interface AppointmentService {
    AppointmentDto createAppointment(AppointmentDto appointmentDto);
    AppointmentDto changeAppointmentStatus(Long id, AppointmentDto appointmentDto);
    List<AppointmentDto> getAllAppointments();
    AppointmentDto getAppointmentById(Long id);
    void cancelAppointment(Long id);
    int checkAvailability(AppointmentDto appointmentDto);
    List<Appointment> findAllAppointmentByDoctorId(Long id);
    List<Appointment> findAllAppointmentByPatientId(Long id);

}
