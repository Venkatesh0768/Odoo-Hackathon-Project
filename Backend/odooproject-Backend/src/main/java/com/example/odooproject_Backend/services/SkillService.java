package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.models.Skill;
import com.example.odooproject_Backend.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {
    private  final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository){
        this.skillRepository = skillRepository;
    }


    public Skill addSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public List<Skill> searchSkillsByName(String name) {
        return skillRepository.findBySkillNameContainingIgnoreCase(name);
    }

    public List<Skill> getSkillsByUserId(Long userId) {
        return skillRepository.findByUserId(userId);
    }

    public void deleteSkill(Long skillId) {
        skillRepository.deleteById(skillId);
    }

}

