package com.example.odooproject_Backend.controller;

import com.example.odooproject_Backend.models.Feedback;
import com.example.odooproject_Backend.models.User;
import com.example.odooproject_Backend.services.FeedbackService;
import com.example.odooproject_Backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<Feedback> leaveFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.leaveFeedback(feedback));
    }

    @GetMapping("/swap/{swapRequestId}")
    public ResponseEntity<Feedback> getFeedbackBySwapRequestId(@PathVariable Long swapRequestId) {
        return feedbackService.getFeedbackBySwapRequestId(swapRequestId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
