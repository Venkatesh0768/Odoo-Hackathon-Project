package com.example.odooproject_Backend.controller;

import com.example.odooproject_Backend.dto.FeedbackDTO;
import com.example.odooproject_Backend.services.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5174",
        allowCredentials = "true"
)
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackDTO> leaveFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        return ResponseEntity.ok(feedbackService.leaveFeedback(feedbackDTO));
    }

    @GetMapping("/swap/{swapRequestId}")
    public ResponseEntity<FeedbackDTO> getFeedbackBySwapRequestId(@PathVariable Long swapRequestId) {
        Optional<FeedbackDTO> feedback = feedbackService.getFeedbackBySwapRequestId(swapRequestId);
        return feedback.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
