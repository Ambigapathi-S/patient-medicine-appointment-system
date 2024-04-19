package com.example.backend.service.impl;

import com.example.backend.dto.DoctorRegisterDto;
import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.PatientRegisterDto;
import com.example.backend.entity.Doctor;
import com.example.backend.entity.Patient;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.APIException;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.DoctorRepository;
import com.example.backend.repository.PatientRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import com.example.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PatientRepository patientRepository;
    private DoctorRepository doctorRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private ModelMapper modelMapper;
    private JwtUtil jwtUtil;
    @Override
    public String DoctorRegister(DoctorRegisterDto doctorRegisterDto) {

        // To check whether a user already exists with the same email
        if (doctorRepository.existsByEmail(doctorRegisterDto.getEmail())) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        // Creating a user from the DTO and to store in the user table
        Doctor doctor = modelMapper.map(doctorRegisterDto, Doctor.class);
        doctor.setPassword(passwordEncoder.encode(doctorRegisterDto.getPassword()));
        doctorRepository.save(doctor);

        // Creating a user from the DTO and to store in the user table
        User user = new User();
        user.setEmail(doctorRegisterDto.getEmail());
        user.setPassword(passwordEncoder.encode(doctorRegisterDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_DOCTOR");
        roles.add(userRole);

        user.setRoles(roles);

        userRepository.save(user);
        return "Doctor Registered Successfully!!";

    }

    @Override
    public String PatientRegister(PatientRegisterDto patientRegisterDto) {
        // To check whether a user already exists with the same email
        if (patientRepository.existsByEmail(patientRegisterDto.getEmail())) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        // Creating a user from the DTO and to store in the user table
        Patient patient = modelMapper.map(patientRegisterDto, Patient.class);
        patient.setPassword(passwordEncoder.encode(patientRegisterDto.getPassword()));
        patientRepository.save(patient);

        // Creating a user from the DTO and to store in the user table
        User user = new User();
        user.setEmail(patientRegisterDto.getEmail());
        user.setPassword(passwordEncoder.encode(patientRegisterDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_PATIENT");
        roles.add(userRole);

        user.setRoles(roles);

        userRepository.save(user);
        return "Patient Registered Successfully!!";
    }

    @Override
    public JwtAuthResponse login(LoginRequestDto loginRequestDto) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                loginRequestDto.getEmail(),
                loginRequestDto.getPassword()
        );
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtil.generate(loginRequestDto.getEmail());

        Optional<User> userOptional = userRepository.findByEmail(loginRequestDto.getEmail());

        String role = "";
        if (userOptional.isPresent()) {
            User loggedInUser = userOptional.get();
            Optional<Role> optionalRole = loggedInUser.getRoles().stream().findFirst();

            Role userRole = optionalRole.get();
            role = userRole.getName();
        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(jwt);
        jwtAuthResponse.setRole(role);

        return jwtAuthResponse;
    }


}
