package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRegisterDto {
    private Long id;
    private String fullName;
    private String dob;
    private String gender;
    private String address;
    private String phoneNumber;
    private String email;
    private String bloodGroup;
    private String medicalHistory;
    private String password;
}
