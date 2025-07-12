package com.example.odooproject_Backend.repository;

import com.example.odooproject_Backend.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findBySwapRequestId(Long swapRequestId);
}
