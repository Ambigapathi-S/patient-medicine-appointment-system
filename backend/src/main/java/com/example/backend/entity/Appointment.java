package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long doctorId;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private String appointment_date;

    @Column(nullable = false)
    private String appointment_from_time;

    @Column(nullable = false)
    private String appointment_to_time;

    @Column(nullable = false)
    private String appointment_type;

    @Column(nullable = false)
    private String appointment_status;
}
