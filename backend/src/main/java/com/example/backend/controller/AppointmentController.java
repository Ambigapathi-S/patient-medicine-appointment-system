package com.example.backend.controller;

import com.example.backend.dto.AppointmentDto;
import com.example.backend.entity.Appointment;
import com.example.backend.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/appointment")
public class AppointmentController {
    private AppointmentService appointmentService;
    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        AppointmentDto savedAppointment = appointmentService.createAppointment(appointmentDto);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getAllAppointments() {
        List<AppointmentDto> appointmentDtoList = appointmentService.getAllAppointments();
        return ResponseEntity.ok().body(appointmentDtoList);
    }

    @GetMapping("{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable("id") Long id) {
        AppointmentDto appointmentDto = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok().body(appointmentDto);
    }

    @PutMapping("{id}")
    public ResponseEntity<AppointmentDto> changeAppointmentStatus(@PathVariable("id") Long id, @RequestBody AppointmentDto appointmentDto) {
        AppointmentDto updateStatus = appointmentService.changeAppointmentStatus(id, appointmentDto);
        return ResponseEntity.ok().body(updateStatus);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok("Appointment Cancelled successfully!");
    }

    @GetMapping("doctor/{id}")
    public ResponseEntity<List<Appointment>> findAllAppointmentByDoctorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(appointmentService.findAllAppointmentByDoctorId(id));
    }

    @GetMapping("patient/{id}")
    public ResponseEntity<List<Appointment>> findAllAppointmentByPatientId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(appointmentService.findAllAppointmentByPatientId(id));
    }


}
