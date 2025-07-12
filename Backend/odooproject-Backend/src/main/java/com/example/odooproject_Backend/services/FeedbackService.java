package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.dto.FeedbackDTO;
import com.example.odooproject_Backend.models.Feedback;
import com.example.odooproject_Backend.models.SwapRequest;
import com.example.odooproject_Backend.repository.FeedbackRepository;
import com.example.odooproject_Backend.repository.SwapRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final SwapRequestRepository swapRequestRepository;

    public FeedbackService(FeedbackRepository feedbackRepository, SwapRequestRepository swapRequestRepository) {
        this.feedbackRepository = feedbackRepository;
        this.swapRequestRepository = swapRequestRepository;
    }

    public FeedbackDTO leaveFeedback(FeedbackDTO dto) {
        SwapRequest swapRequest = swapRequestRepository.findById(dto.getSwapRequestId())
                .orElseThrow(() -> new RuntimeException("Swap request not found"));

        Feedback feedback = new Feedback();
        feedback.setRating(dto.getRating());
        feedback.setComment(dto.getComment());
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setSwapRequest(swapRequest);

        return convertToDTO(feedbackRepository.save(feedback));
    }

    public Optional<FeedbackDTO> getFeedbackBySwapRequestId(Long swapRequestId) {
        return feedbackRepository.findBySwapRequestId(swapRequestId).map(this::convertToDTO);
    }

    public FeedbackDTO convertToDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setRating(feedback.getRating());
        dto.setComment(feedback.getComment());
        dto.setCreatedAt(feedback.getCreatedAt());
        dto.setSwapRequestId(feedback.getSwapRequest().getId());
        return dto;
    }
}
