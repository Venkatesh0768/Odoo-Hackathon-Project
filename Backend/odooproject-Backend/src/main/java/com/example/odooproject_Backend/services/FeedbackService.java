package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.models.Feedback;
import com.example.odooproject_Backend.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository){
        this.feedbackRepository = feedbackRepository;
    }

    public Feedback leaveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Optional<Feedback> getFeedbackBySwapRequestId(Long swapRequestId) {
        return feedbackRepository.findBySwapRequestId(swapRequestId);
    }
}
