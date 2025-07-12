package com.example.odooproject_Backend.controller;

import com.example.odooproject_Backend.dto.SwapRequestDTO;
import com.example.odooproject_Backend.models.SwapRequest;
import com.example.odooproject_Backend.services.SwapRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/swaps")
@CrossOrigin(
        origins = "http://localhost:5174",
        allowCredentials = "true"
)
public class SwapRequestController {

    private final SwapRequestService swapRequestService;

    public SwapRequestController(SwapRequestService swapRequestService) {
        this.swapRequestService = swapRequestService;
    }

    @PostMapping
    public ResponseEntity<SwapRequestDTO> createSwapRequest(@RequestBody SwapRequest request) {
        SwapRequest created = swapRequestService.createSwapRequest(request);
        return ResponseEntity.ok(swapRequestService.convertToDTO(created));
    }

    @GetMapping("/sender/{senderId}")
    public ResponseEntity<List<SwapRequestDTO>> getRequestsBySender(@PathVariable Long senderId) {
        return ResponseEntity.ok(swapRequestService.getRequestsBySender(senderId));
    }

    @GetMapping("/receiver/{receiverId}")
    public ResponseEntity<List<SwapRequestDTO>> getRequestsByReceiver(@PathVariable Long receiverId) {
        return ResponseEntity.ok(swapRequestService.getRequestsByReceiver(receiverId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<SwapRequestDTO> updateSwapStatus(@PathVariable Long id, @RequestParam String status) {
        SwapRequest updated = swapRequestService.updateSwapRequestStatus(id, status);
        return ResponseEntity.ok(swapRequestService.convertToDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSwapRequest(@PathVariable Long id) {
        swapRequestService.deleteSwapRequest(id);
        return ResponseEntity.ok().build();
    }
}
