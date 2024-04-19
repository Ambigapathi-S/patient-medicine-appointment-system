package com.example.backend.service.impl;

import com.example.backend.dto.AppointmentDto;
import com.example.backend.dto.DoctorRegisterDto;
import com.example.backend.dto.PatientRegisterDto;
import com.example.backend.entity.Appointment;
import com.example.backend.entity.Doctor;
import com.example.backend.entity.Patient;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.repository.DoctorRepository;
import com.example.backend.repository.PatientRepository;
import com.example.backend.service.DoctorPatientService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class DoctorPatientServiceImpl implements DoctorPatientService {

    private PatientRepository patientRepository;
    private DoctorRepository doctorRepository;
    private ModelMapper modelMapper;
    @Override
    public List<DoctorRegisterDto> getDoctorList() {
        return doctorRepository.findAll()
                .stream().map(doctor -> modelMapper.map(doctor, DoctorRegisterDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public DoctorRegisterDto getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        return modelMapper.map(doctor, DoctorRegisterDto.class);
    }

    @Override
    public DoctorRegisterDto findDoctorByEmail(String email) {
        Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "email", email));
        return modelMapper.map(doctor, DoctorRegisterDto.class);
    }

    @Override
    public DoctorRegisterDto editDoctorDetail(Long id, DoctorRegisterDto doctorRegisterDto) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        doctor.setFullName(doctorRegisterDto.getFullName());
        doctor.setDob(doctorRegisterDto.getDob());
        doctor.setGender(doctorRegisterDto.getGender());
        doctor.setAddress(doctorRegisterDto.getAddress());
        doctor.setPhoneNumber(doctorRegisterDto.getPhoneNumber());
        doctor.setEmail(doctorRegisterDto.getEmail());
        doctor.setDesignation(doctorRegisterDto.getDesignation());
        doctor.setSpecialization(doctorRegisterDto.getSpecialization());
        doctor.setYearsOfExp(doctorRegisterDto.getYearsOfExp());
        doctor.setPassword(doctor.getPassword());
        doctor.setConsultingFees(doctorRegisterDto.getConsultingFees());
        doctor.setConsultingHrs(doctorRegisterDto.getConsultingHrs());
        doctor.setAvailabilityFromTime(doctorRegisterDto.getAvailabilityFromTime());
        doctor.setAvailabilityToTime(doctorRegisterDto.getAvailabilityToTime());
        doctor.setStatus(doctorRegisterDto.getStatus());
        return modelMapper.map(doctorRepository.save(doctor), DoctorRegisterDto.class);
    }

    @Override
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        doctorRepository.deleteById(id);
    }

    @Override
    public List<PatientRegisterDto> getPatientList() {
        return patientRepository.findAll()
                .stream().map(patient -> modelMapper.map(patient, PatientRegisterDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public PatientRegisterDto getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        return modelMapper.map(patient, PatientRegisterDto.class);
    }

    @Override
    public PatientRegisterDto findPatientByEmail(String email) {
        Patient patient = patientRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "email", email));
        return modelMapper.map(patient, PatientRegisterDto.class);
    }

    @Override
    public PatientRegisterDto editpatientDetail(Long id, PatientRegisterDto patientRegisterDto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        patient.setFullName(patientRegisterDto.getFullName());
        patient.setDob(patientRegisterDto.getDob());
        patient.setGender(patientRegisterDto.getGender());
        patient.setAddress(patientRegisterDto.getAddress());
        patient.setPhoneNumber(patientRegisterDto.getPhoneNumber());
        patient.setEmail(patientRegisterDto.getEmail());
        patient.setBloodGroup(patientRegisterDto.getBloodGroup());
        patient.setMedicalHistory(patientRegisterDto.getMedicalHistory());

        return modelMapper.map(patientRepository.save(patient), PatientRegisterDto.class);
    }
    @Override
    public void deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        patientRepository.deleteById(id);
    }


}
