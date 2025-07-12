package com.example.odooproject_Backend.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int rating;

    private String comment;

    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "swap_request_id", referencedColumnName = "id")
    private SwapRequest swapRequest;
}
