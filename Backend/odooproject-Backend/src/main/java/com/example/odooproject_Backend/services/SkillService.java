package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.dto.SkillDTO;
import com.example.odooproject_Backend.dto.UserDTO;
import com.example.odooproject_Backend.models.Skill;
import com.example.odooproject_Backend.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {
    private final SkillRepository skillRepository;
    private final UserService userService;  // Inject UserService to convert User → UserDTO

    public SkillService(SkillRepository skillRepository, UserService userService) {
        this.skillRepository = skillRepository;
        this.userService = userService;
    }

    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public List<SkillDTO> getAllSkills() {
        return skillRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SkillDTO> searchSkillsByName(String name) {
        return skillRepository.findBySkillNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<SkillDTO> getSkillsByUserId(Long userId) {
        return skillRepository.findByUserId(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void deleteSkill(Long skillId) {
        skillRepository.deleteById(skillId);
    }

    public SkillDTO convertToDTO(Skill skill) {
        UserDTO userDTO = userService.convertToDTO(skill.getUser());
        return new SkillDTO(
                skill.getId(),
                skill.getSkillName(),
                skill.getSkillType(),
                userDTO
        );
    }
}
