package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.models.User;
import com.example.odooproject_Backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registeruser(User user) {
        if (userRepository.existsByEmail(user.getEmail())){
            throw new RuntimeException("This Email Already Exit");
        }
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
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

}
