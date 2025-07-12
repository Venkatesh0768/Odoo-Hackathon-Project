package com.example.odooproject_Backend.repository;

import com.example.odooproject_Backend.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
    List<User> findBySkills_SkillNameIgnoreCase(String skillName);


}
