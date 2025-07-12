package com.example.odooproject_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SwapRequestDTO {
    private Long id;
    private UserDTO sender;
    private UserDTO receiver;
    private SkillDTO offeredSkill;
    private SkillDTO requestedSkill;
    private String status;
    private LocalDateTime createdAt;
}
