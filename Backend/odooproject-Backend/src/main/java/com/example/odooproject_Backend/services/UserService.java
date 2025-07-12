package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.dto.LoginResponseDTO;
import com.example.odooproject_Backend.dto.UpdateUserDTO;
import com.example.odooproject_Backend.dto.UserDTO;
import com.example.odooproject_Backend.models.User;
import com.example.odooproject_Backend.repository.SkillRepository;
import com.example.odooproject_Backend.repository.UserRepository;
import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registeruser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("This Email Already Exists");
        }
        return userRepository.save(user);
    }

    public Optional<UserDTO> getUserDTOById(Long id) {
        return userRepository.findById(id).map(this::convertToDTO);
    }

    public List<UserDTO> getAllUserDTOs() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void banUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setBanned(true);
        userRepository.save(user);
    }

    public void unbanUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setBanned(false);
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public ResponseEntity<?> loginUserByEmail(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty() || !optionalUser.get().getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        }

        if (optionalUser.get().isBanned()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "User is banned. Please contact admin."));
        }

        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "user", convertToDTO(optionalUser.get())
        ));
    }




    public List<UserDTO> searchUsers(String skill, int page, int size) {
        List<User> users;
        if (skill != null && !skill.isEmpty()) {
            users = userRepository.findAll().stream()
                    .filter(u -> u.getSkills() != null && u.getSkills().stream()
                            .anyMatch(s -> s.getSkillName().equalsIgnoreCase(skill)))
                    .collect(Collectors.toList());
        } else {
            users = userRepository.findAll();
        }
        // Pagination (simple, for demo)
        int fromIndex = Math.min(page * size, users.size());
        int toIndex = Math.min(fromIndex + size, users.size());
        return users.subList(fromIndex, toIndex).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(Long userId, UpdateUserDTO updateUserDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        
        // Update only the allowed fields
        if (updateUserDTO.getName() != null) {
            user.setName(updateUserDTO.getName());
        }
        if (updateUserDTO.getLocation() != null) {
            user.setLocation(updateUserDTO.getLocation());
        }
        if (updateUserDTO.getProfilePhoto() != null) {
            user.setProfilePhoto(updateUserDTO.getProfilePhoto());
        }
        user.setPublic(updateUserDTO.isPublic());
        
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    public UserDTO convertToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getLocation(),
                user.getProfilePhoto(),
                user.isPublic(),
                user.isBanned(),
                user.getRole()
        );
    }
}
