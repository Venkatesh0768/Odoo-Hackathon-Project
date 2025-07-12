package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.models.SwapRequest;
import com.example.odooproject_Backend.repository.SwapRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SwapRequestService {
    private  final SwapRequestRepository swapRequestRepository;

    public SwapRequestService(SwapRequestRepository swapRequestRepository){
        this.swapRequestRepository = swapRequestRepository;
    }

    public SwapRequest createSwapRequest(SwapRequest request) {
        request.setStatus("PENDING");
        return swapRequestRepository.save(request);
    }

    public List<SwapRequest> getRequestsBySender(Long senderId) {
        return swapRequestRepository.findBySenderId(senderId);
    }

    public List<SwapRequest> getRequestsByReceiver(Long receiverId) {
        return swapRequestRepository.findByReceiverId(receiverId);
    }

    public SwapRequest updateSwapRequestStatus(Long requestId, String status) {
        SwapRequest request = swapRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(status);
        return swapRequestRepository.save(request);
    }

    public void deleteSwapRequest(Long requestId) {
        swapRequestRepository.deleteById(requestId);
    }

}
