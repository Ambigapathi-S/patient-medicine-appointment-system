package com.example.backend.service;

import com.example.backend.dto.DoctorRegisterDto;
import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.PatientRegisterDto;

import java.util.List;

public interface AuthService {
    String DoctorRegister(DoctorRegisterDto doctorRegisterDto);
    String PatientRegister(PatientRegisterDto patientRegisterDto);
    JwtAuthResponse login(LoginRequestDto loginRequestDto);

}
