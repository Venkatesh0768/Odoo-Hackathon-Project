package com.example.odooproject_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminLogDTO {
    private Long id;
    private String action;
    private String message;
    private LocalDateTime timestamp;
    private UserDTO admin;
    private UserDTO targetUser;
}
