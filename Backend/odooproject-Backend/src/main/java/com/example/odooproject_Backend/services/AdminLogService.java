package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.dto.AdminLogDTO;
import com.example.odooproject_Backend.dto.UserDTO;
import com.example.odooproject_Backend.models.AdminLog;
import com.example.odooproject_Backend.models.User;
import com.example.odooproject_Backend.repository.AdminLogRepository;
import com.example.odooproject_Backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminLogService {
    private final AdminLogRepository adminLogRepository;
    private final UserRepository userRepository;

    public AdminLogService(AdminLogRepository adminLogRepository, UserRepository userRepository) {
        this.adminLogRepository = adminLogRepository;
        this.userRepository = userRepository;
    }

    public AdminLogDTO recordAction(AdminLogDTO logDTO) {
        User admin = userRepository.findById(logDTO.getAdmin().getId())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        User targetUser = userRepository.findById(logDTO.getTargetUser().getId())
                .orElseThrow(() -> new RuntimeException("Target user not found"));

        AdminLog log = new AdminLog();
        log.setAction(logDTO.getAction());
        log.setMessage(logDTO.getMessage());
        log.setTimestamp(LocalDateTime.now());
        log.setAdmin(admin);
        log.setTargetUser(targetUser);

        return convertToDTO(adminLogRepository.save(log));
    }

    public List<AdminLogDTO> getLogsByAdminId(Long adminId) {
        return adminLogRepository.findByAdminId(adminId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AdminLogDTO convertToDTO(AdminLog log) {
        AdminLogDTO dto = new AdminLogDTO();
        dto.setId(log.getId());
        dto.setAction(log.getAction());
        dto.setMessage(log.getMessage());
        dto.setTimestamp(log.getTimestamp());

        dto.setAdmin(convertUserToDTO(log.getAdmin()));
        dto.setTargetUser(convertUserToDTO(log.getTargetUser()));
        return dto;
    }

    private UserDTO convertUserToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setLocation(user.getLocation());
        dto.setProfilePhoto(user.getProfilePhoto());
        dto.setPublic(user.isPublic());
        dto.setBanned(user.isBanned());
        dto.setRole(user.getRole());
        return dto;
    }
}
