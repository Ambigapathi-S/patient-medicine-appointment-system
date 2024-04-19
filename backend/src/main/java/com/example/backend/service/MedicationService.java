package com.example.backend.service;

import com.example.backend.dto.MedicationDto;
import com.example.backend.entity.Medication;

import java.util.List;

public interface MedicationService {
    MedicationDto saveMedication(MedicationDto medicationDto);
    List<MedicationDto> getAllMedication();
    MedicationDto getMedicationById(Long id);
    MedicationDto updateMedication(Long id, MedicationDto medicationDto);
    void deleteMedication(Long id);
    List<Medication> findMedicationByAppointmentId(Long app_id);
}
