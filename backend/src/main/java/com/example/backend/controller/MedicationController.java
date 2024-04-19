package com.example.backend.controller;

import com.example.backend.dto.MedicationDto;
import com.example.backend.entity.Appointment;
import com.example.backend.entity.Medication;
import com.example.backend.service.MedicationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/medication")
public class MedicationController {
    private MedicationService medicationService;
    @PostMapping
    public ResponseEntity<MedicationDto> saveMedication(@RequestBody MedicationDto medicationDto) {
        MedicationDto savedMedication = medicationService.saveMedication(medicationDto);
        return new ResponseEntity<>(savedMedication, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<MedicationDto>> getAllMedication() {
        List<MedicationDto> medicationDtoList = medicationService.getAllMedication();
        return ResponseEntity.ok().body(medicationDtoList);
    }

    @GetMapping("{id}")
    public ResponseEntity<MedicationDto> getMedicationById(@PathVariable("id") Long id) {
        MedicationDto medicationDto = medicationService.getMedicationById(id);
        return ResponseEntity.ok().body(medicationDto);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<MedicationDto> updateMedication(@PathVariable("id") Long id, @RequestBody MedicationDto medicationDto) {
        MedicationDto updatedMedication = medicationService.updateMedication(id, medicationDto);
        return ResponseEntity.ok(updatedMedication);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
        return ResponseEntity.ok("Medication deleted successfully!");
    }

    @GetMapping("appointment/{id}")
    public ResponseEntity<List<Medication>> findMedicationByAppointmentId(@PathVariable("id") Long app_id) {
        return ResponseEntity.ok(medicationService.findMedicationByAppointmentId(app_id));
    }
}
