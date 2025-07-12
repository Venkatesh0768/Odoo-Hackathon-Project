package com.example.odooproject_Backend.repository;

import com.example.odooproject_Backend.models.SwapRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SwapRequestRepository extends JpaRepository<SwapRequest, Long> {
    List<SwapRequest> findBySenderId(Long senderId);
    List<SwapRequest> findByReceiverId(Long receiverId);
    List<SwapRequest> findByStatus(String status);
}

