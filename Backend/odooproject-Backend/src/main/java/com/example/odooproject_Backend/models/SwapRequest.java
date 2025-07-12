package com.example.odooproject_Backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SwapRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "offered_skill_id")
    private Skill offeredSkill;

    @ManyToOne
    @JoinColumn(name = "requested_skill_id")
    private Skill requestedSkill;

    private String status; // "PENDING", "ACCEPTED", "REJECTED", "DELETED"
    private LocalDateTime createdAt = LocalDateTime.now();
}

