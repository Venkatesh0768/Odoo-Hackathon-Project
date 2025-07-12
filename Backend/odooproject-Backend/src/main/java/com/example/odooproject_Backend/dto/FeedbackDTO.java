package com.example.odooproject_Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
    private Long id;
    private Long swapRequestId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
