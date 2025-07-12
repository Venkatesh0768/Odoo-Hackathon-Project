package com.example.odooproject_Backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillName;
    private String skillType; // "OFFERED" or "WANTED"

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"skills"})
    private User user;
}
