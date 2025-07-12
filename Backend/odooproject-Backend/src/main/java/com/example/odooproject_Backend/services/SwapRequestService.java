package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.dto.SwapRequestDTO;
import com.example.odooproject_Backend.dto.SkillDTO;
import com.example.odooproject_Backend.dto.UserDTO;
import com.example.odooproject_Backend.models.SwapRequest;
import com.example.odooproject_Backend.repository.SwapRequestRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SwapRequestService {
    private final SwapRequestRepository swapRequestRepository;
    private final UserService userService;
    private final SkillService skillService;

    public SwapRequestService(SwapRequestRepository swapRequestRepository, UserService userService, SkillService skillService) {
        this.swapRequestRepository = swapRequestRepository;
        this.userService = userService;
        this.skillService = skillService;
    }

    public SwapRequest createSwapRequest(SwapRequest request) {
        request.setStatus("PENDING");
        request.setCreatedAt(LocalDateTime.now());
        return swapRequestRepository.save(request);
    }

    public List<SwapRequestDTO> getRequestsBySender(Long senderId) {
        return swapRequestRepository.findBySenderId(senderId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SwapRequestDTO> getRequestsByReceiver(Long receiverId) {
        return swapRequestRepository.findByReceiverId(receiverId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public SwapRequest updateSwapRequestStatus(Long requestId, String status) {
        SwapRequest request = swapRequestRepository.findById(requestId).orElseThrow();
        request.setStatus(status);
        return swapRequestRepository.save(request);
    }

    public void deleteSwapRequest(Long requestId) {
        swapRequestRepository.deleteById(requestId);
    }

    public SwapRequestDTO convertToDTO(SwapRequest request) {
        UserDTO senderDTO = userService.convertToDTO(request.getSender());
        UserDTO receiverDTO = userService.convertToDTO(request.getReceiver());
        SkillDTO offeredSkillDTO = skillService.convertToDTO(request.getOfferedSkill());
        SkillDTO requestedSkillDTO = skillService.convertToDTO(request.getRequestedSkill());

        return new SwapRequestDTO(
                request.getId(),
                senderDTO,
                receiverDTO,
                offeredSkillDTO,
                requestedSkillDTO,
                request.getStatus(),
                request.getCreatedAt()
        );
    }
}
