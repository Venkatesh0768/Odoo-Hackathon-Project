package com.example.odooproject_Backend.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "swap_request_id")
    private SwapRequest swapRequest;

    private int rating;
    private String comment;
    private LocalDateTime createdAt = LocalDateTime.now();
}
