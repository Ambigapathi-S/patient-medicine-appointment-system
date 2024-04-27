package com.example.backend.controller;

import com.example.backend.dto.MedicationDto;
import com.example.backend.entity.Appointment;
import com.example.backend.entity.Medication;
import com.example.backend.service.MedicationService;
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
@RequestMapping("api/medication")
public class MedicationController {
    private MedicationService medicationService;

    @Operation(
            summary = "Create Medication REST API ",
            description = "Create Medication"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Created"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\")")
    @PostMapping
    public ResponseEntity<MedicationDto> saveMedication(@RequestBody MedicationDto medicationDto) {
        MedicationDto savedMedication = medicationService.saveMedication(medicationDto);
        return new ResponseEntity<>(savedMedication, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Get All Medications REST API ",
            description = "Get All Medications"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\")")
    @GetMapping
    public ResponseEntity<List<MedicationDto>> getAllMedication() {
        List<MedicationDto> medicationDtoList = medicationService.getAllMedication();
        return ResponseEntity.ok().body(medicationDtoList);
    }

    @Operation(
            summary = "Get Medications by ID REST API ",
            description = "Get Medications by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\", \"PATIENT\")")
    @GetMapping("{id}")
    public ResponseEntity<MedicationDto> getMedicationById(@PathVariable("id") Long id) {
        MedicationDto medicationDto = medicationService.getMedicationById(id);
        return ResponseEntity.ok().body(medicationDto);
    }

    @Operation(
            summary = "Update Medication by ID REST API ",
            description = "Update Medication by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\")")
    @PutMapping("update/{id}")
    public ResponseEntity<MedicationDto> updateMedication(@PathVariable("id") Long id, @RequestBody MedicationDto medicationDto) {
        MedicationDto updatedMedication = medicationService.updateMedication(id, medicationDto);
        return ResponseEntity.ok(updatedMedication);
    }

    @Operation(
            summary = "Delete Medication by ID REST API ",
            description = "Delete Medication by ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 OK"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\")")
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
        return ResponseEntity.ok("Medication deleted successfully!");
    }

    @Operation(
            summary = "Get Medication by Appointment ID REST API ",
            description = "Get Medication by Appointment ID"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 200 Success"
    )
    @PreAuthorize("hasAnyRole(\"ADMIN\",\"DOCTOR\", \"PATIENT\")")
    @GetMapping("appointment/{id}")
    public ResponseEntity<List<Medication>> findMedicationByAppointmentId(@PathVariable("id") Long app_id) {
        return ResponseEntity.ok(medicationService.findMedicationByAppointmentId(app_id));
    }
}
