package com.example.odooproject_Backend.repository;

import com.example.odooproject_Backend.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findBySkillNameContainingIgnoreCase(String name);
    List<Skill> findByUserId(Long userId);
}
