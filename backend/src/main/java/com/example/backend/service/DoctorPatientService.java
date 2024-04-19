package com.example.backend.service;

import com.example.backend.dto.AppointmentDto;
import com.example.backend.dto.DoctorRegisterDto;
import com.example.backend.dto.PatientRegisterDto;

import java.util.List;

public interface DoctorPatientService {
    List<DoctorRegisterDto> getDoctorList();

    DoctorRegisterDto getDoctorById(Long id);

    DoctorRegisterDto findDoctorByEmail(String email);

    DoctorRegisterDto editDoctorDetail(Long id, DoctorRegisterDto doctorRegisterDto);

    void deleteDoctor(Long id);

    List<PatientRegisterDto> getPatientList();

    PatientRegisterDto getPatientById(Long id);

    PatientRegisterDto findPatientByEmail(String email);

    PatientRegisterDto editpatientDetail(Long id,PatientRegisterDto patientRegisterDto);

    void deletePatient(Long id);

}
