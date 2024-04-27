package com.example.backend.controller;

import com.example.backend.dto.DoctorRegisterDto;
import com.example.backend.dto.PatientRegisterDto;
import com.example.backend.service.DoctorPatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/")
public class DoctorPatientController {
    private DoctorPatientService doctorPatientService;

    @Operation(
            summary = "Get Doctor list REST API ",
            description = "Get Doctor list"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"PATIENT\",\"DOCTOR\")")
    @GetMapping("doctor-list")
    public ResponseEntity<List<DoctorRegisterDto>> getDoctorList() {
        List<DoctorRegisterDto> doctorList = doctorPatientService.getDoctorList();
        return ResponseEntity.ok().body(doctorList);
    }

    @Operation(
            summary = "Get Doctor list by ID REST API ",
            description = "Get Doctor list by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"PATIENT\",\"DOCTOR\")")
    @GetMapping("doctor-list/{id}")
    public ResponseEntity<DoctorRegisterDto> getDoctorById(@PathVariable("id") Long id) {
        DoctorRegisterDto doctorRegisterDto = doctorPatientService.getDoctorById(id);
        return ResponseEntity.ok().body(doctorRegisterDto);
    }


    @Operation(
            summary = "Get Doctor list by email REST API ",
            description = "Get Doctor list by email"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\")")
    @GetMapping("doctor/my-profile")
    public ResponseEntity<DoctorRegisterDto> findDoctorByEmail(@RequestParam("email") String email) {
        DoctorRegisterDto doctorRegisterDto = doctorPatientService.findDoctorByEmail(email);
        return ResponseEntity.ok().body(doctorRegisterDto);
    }

    @Operation(
            summary = "Update Doctor Profile REST API ",
            description = "Update Doctor Profile"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"DOCTOR\")")
    @PutMapping("doctor/my-profile/{id}")
    public ResponseEntity<DoctorRegisterDto> editDoctorDetail(@PathVariable("id") Long id, @RequestBody DoctorRegisterDto doctorRegisterDto) {
        DoctorRegisterDto updatedAvailability = doctorPatientService.editDoctorDetail(id, doctorRegisterDto);
        return ResponseEntity.ok(updatedAvailability);
    }

    @Operation(
            summary = "Delete Doctor by Id REST API ",
            description = "Delete Doctor by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @PreAuthorize("hasRole(\"ADMIN\")")
    @DeleteMapping("doctor/delete/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        doctorPatientService.deleteDoctor(id);
        return ResponseEntity.ok("Doctor deleted successfully!");
    }


    @Operation(
            summary = "Get Patient list REST API ",
            description = "Get Patient list"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\")")
    @GetMapping("patient-list")
    public ResponseEntity<List<PatientRegisterDto>> getPatientList() {
        List<PatientRegisterDto> patientList = doctorPatientService.getPatientList();
        return ResponseEntity.ok().body(patientList);
    }

    @Operation(
            summary = "Get Patient list REST API ",
            description = "Get Patient list"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"PATIENT\",\"DOCTOR\")")
    @GetMapping("patient-list/{id}")
    public ResponseEntity<PatientRegisterDto> getPatientById(@PathVariable("id") Long id) {
        PatientRegisterDto patient = doctorPatientService.getPatientById(id);
        return ResponseEntity.ok().body(patient);
    }

    @Operation(
            summary = "Get Doctor list by Email REST API ",
            description = "Get Doctor list by Email"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"PATIENT\")")
    @GetMapping("patient/my-profile")
    public ResponseEntity<PatientRegisterDto> findPatientByEmail(@RequestParam("email") String email) {
        PatientRegisterDto patient = doctorPatientService.findPatientByEmail(email);
        return ResponseEntity.ok().body(patient);
    }

    @Operation(
            summary = "Update Patient Profile REST API ",
            description = "Update Patient Profile"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\", \"PATIENT\")")
    @PutMapping("patient/my-profile/{id}")
    public ResponseEntity<PatientRegisterDto> editpatientDetail(@PathVariable("id") Long id, @RequestBody PatientRegisterDto patientRegisterDto) {
        PatientRegisterDto updatedPatient = doctorPatientService.editpatientDetail(id, patientRegisterDto);
        return ResponseEntity.ok(updatedPatient);
    }

    @Operation(
            summary = "Delete Patient REST API ",
            description = "Delete Patient by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\")")
    @DeleteMapping("patient/delete/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        doctorPatientService.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully!");
    }

}
