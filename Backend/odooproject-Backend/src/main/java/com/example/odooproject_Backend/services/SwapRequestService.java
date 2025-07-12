package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.dto.SwapRequestDTO;
import com.example.odooproject_Backend.dto.SkillDTO;
import com.example.odooproject_Backend.dto.UserDTO;
import com.example.odooproject_Backend.models.SwapRequest;
import com.example.odooproject_Backend.repository.SwapRequestRepository;
import com.example.odooproject_Backend.repository.UserRepository;
import com.example.odooproject_Backend.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.example.odooproject_Backend.models.User;
import com.example.odooproject_Backend.models.Skill;

@Service
public class SwapRequestService {
    private final SwapRequestRepository swapRequestRepository;
    private final UserService userService;
    private final SkillService skillService;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public SwapRequestService(SwapRequestRepository swapRequestRepository, UserService userService, SkillService skillService, UserRepository userRepository, SkillRepository skillRepository) {
        this.swapRequestRepository = swapRequestRepository;
        this.userService = userService;
        this.skillService = skillService;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public SwapRequest createSwapRequest(SwapRequest request) {
        // Fetch full objects from DB
        User sender = userRepository.findById(request.getSender().getId()).orElseThrow();
        User receiver = userRepository.findById(request.getReceiver().getId()).orElseThrow();
        Skill offeredSkill = skillRepository.findById(request.getOfferedSkill().getId()).orElseThrow();
        Skill requestedSkill = skillRepository.findById(request.getRequestedSkill().getId()).orElseThrow();

        request.setSender(sender);
        request.setReceiver(receiver);
        request.setOfferedSkill(offeredSkill);
        request.setRequestedSkill(requestedSkill);
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
