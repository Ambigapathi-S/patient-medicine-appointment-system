package com.example.backend.dto;

import com.example.backend.entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MedicationDto {
    private Long id;
    private Appointment appointment;
    private String prescription;
    private String notes;
}
