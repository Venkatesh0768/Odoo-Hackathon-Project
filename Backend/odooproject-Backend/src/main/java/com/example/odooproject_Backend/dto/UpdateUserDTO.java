package com.example.odooproject_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDTO {
    private String name;
    private String email;
    private String location;
    private String profilePhoto;
    private boolean isPublic;
} 