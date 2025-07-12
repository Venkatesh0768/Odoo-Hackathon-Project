package com.example.odooproject_Backend.controller;


import com.example.odooproject_Backend.models.SwapRequest;
import com.example.odooproject_Backend.services.SwapRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/swaps")
public class SwapRequestController {

    public SwapRequestService swapRequestService;

    public  SwapRequestController(SwapRequestService swapRequestService){
        this.swapRequestService = swapRequestService;
    }

    @PostMapping
    public ResponseEntity<SwapRequest> createSwapRequest(@RequestBody SwapRequest request) {
        return ResponseEntity.ok(swapRequestService.createSwapRequest(request));
    }

    @GetMapping("/sender/{senderId}")
    public ResponseEntity<List<SwapRequest>> getRequestsBySender(@PathVariable Long senderId) {
        return ResponseEntity.ok(swapRequestService.getRequestsBySender(senderId));
    }

    @GetMapping("/receiver/{receiverId}")
    public ResponseEntity<List<SwapRequest>> getRequestsByReceiver(@PathVariable Long receiverId) {
        return ResponseEntity.ok(swapRequestService.getRequestsByReceiver(receiverId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SwapRequest> updateSwapStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(swapRequestService.updateSwapRequestStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSwapRequest(@PathVariable Long id) {
        swapRequestService.deleteSwapRequest(id);
        return ResponseEntity.ok().build();
    }
}
