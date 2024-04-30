package com.example.backend;

import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Patient Medicine & Appointment Management API Documentation",
				description = "Patient Medicine & Appointment Management API Documentation",
				version = "v1.0",
				contact = @Contact(
						name = "Ambiga",
						email = "ambiga.bca2020@gmail.com",
						url = "https://ambigapathi.netlify.app/"
				),
				license = @License(
						name = "Apache 2.0"
				)
		),
		externalDocs = @ExternalDocumentation(
				description = "Spring Boot REST API for Patient Medicine & Appointment Management"
		)
)
public class BackendApplication {
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
