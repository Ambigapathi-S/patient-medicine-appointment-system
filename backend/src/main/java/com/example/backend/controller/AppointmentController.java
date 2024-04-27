package com.example.backend.controller;

import com.example.backend.dto.AppointmentDto;
import com.example.backend.entity.Appointment;
import com.example.backend.service.AppointmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/appointment")
public class AppointmentController {
    private AppointmentService appointmentService;

    @Operation(
            summary = "Create Appointment REST API ",
            description = "Create Appointment"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Created"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\", \"PATIENT\")")
    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto) {
        AppointmentDto savedAppointment = appointmentService.createAppointment(appointmentDto);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get all Appointments REST API ",
            description = "Get all Appointments"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\")")
    @GetMapping
    public ResponseEntity<List<AppointmentDto>> getAllAppointments() {
        List<AppointmentDto> appointmentDtoList = appointmentService.getAllAppointments();
        return ResponseEntity.ok().body(appointmentDtoList);
    }

    @Operation(
            summary = "Get Appointments By Id REST API ",
            description = "Get Appointments By Id"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\", \"PATIENT\")")
    @GetMapping("{id}")
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable("id") Long id) {
        AppointmentDto appointmentDto = appointmentService.getAppointmentById(id);
        return ResponseEntity.ok().body(appointmentDto);
    }

    @Operation(
            summary = "Change Appointments Status REST API ",
            description = "Change Appointments Status By Id"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\")")
    @PutMapping("{id}")
    public ResponseEntity<AppointmentDto> changeAppointmentStatus(@PathVariable("id") Long id, @RequestBody AppointmentDto appointmentDto) {
        AppointmentDto updateStatus = appointmentService.changeAppointmentStatus(id, appointmentDto);
        return ResponseEntity.ok().body(updateStatus);
    }

    @Operation(
            summary = "Delete Appointment REST API ",
            description = "Delete Appointment By Id"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\", \"PATIENT\")")
    @DeleteMapping("{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable long id) {
        appointmentService.cancelAppointment(id);
        return ResponseEntity.ok("Appointment Cancelled successfully!");
    }

    @Operation(
            summary = "Get Appointment REST API ",
            description = "Get Appointment By Doctor Id"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\", \"PATIENT\")")
    @GetMapping("doctor/{id}")
    public ResponseEntity<List<Appointment>> findAllAppointmentByDoctorId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(appointmentService.findAllAppointmentByDoctorId(id));
    }

    @Operation(
            summary = "Get Appointment REST API ",
            description = "Get Appointment By Patient Id"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\", \"PATIENT\")")
    @GetMapping("patient/{id}")
    public ResponseEntity<List<Appointment>> findAllAppointmentByPatientId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(appointmentService.findAllAppointmentByPatientId(id));
    }


}
