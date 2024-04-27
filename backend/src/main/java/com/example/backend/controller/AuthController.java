package com.example.backend.controller;

import com.example.backend.dto.DoctorRegisterDto;
import com.example.backend.dto.JwtAuthResponse;
import com.example.backend.dto.LoginRequestDto;
import com.example.backend.dto.PatientRegisterDto;
import com.example.backend.service.AuthService;
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
@RequestMapping("api/auth")
public class AuthController {
    private AuthService authService;

    @Operation(
            summary = "Login User REST API ",
            description = "Login User"
    )
    @ApiResponse(
            responseCode = "201",
            description = "HTTP Status 201 Success"
    )
    @PostMapping("login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequestDto requestDto) {
        JwtAuthResponse jwtAuthResponse = authService.login(requestDto);
        return ResponseEntity.ok(jwtAuthResponse);
    }


    @Operation(
            summary = "Register Patient REST API ",
            description = "Register Patient"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 201 Created"
    )
    @PostMapping("patient-register")
    public ResponseEntity<String> PatientRegister(@RequestBody PatientRegisterDto registerDto) {
        String response = authService.PatientRegister(registerDto);
        return ResponseEntity.ok(response);
    }


    @Operation(
            summary = "Register Doctor REST API ",
            description = "Register Doctor"
    )
    @ApiResponse(
            responseCode = "200",
            description = "HTTP Status 201 Created"
    )
    @PostMapping("doctor-register")
    public ResponseEntity<String> DoctorRegister(@RequestBody DoctorRegisterDto doctorRegisterDto) {
        String response = authService.DoctorRegister(doctorRegisterDto);
        return ResponseEntity.ok(response);
    }

}