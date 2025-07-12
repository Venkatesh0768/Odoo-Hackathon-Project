package com.example.odooproject_Backend.controller;

import com.example.odooproject_Backend.dto.SkillDTO;
import com.example.odooproject_Backend.models.Skill;
import com.example.odooproject_Backend.services.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/skills")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<SkillDTO> addSkill(@RequestBody Skill skill) {
        Skill savedSkill = skillService.addSkill(skill);
        return ResponseEntity.ok(skillService.convertToDTO(savedSkill));
    }

    @GetMapping
    public ResponseEntity<List<SkillDTO>> getAllSkills() {
        return ResponseEntity.ok(skillService.getAllSkills());
    }

    @GetMapping("/search")
    public ResponseEntity<List<SkillDTO>> searchSkillsByName(@RequestParam String name) {
        return ResponseEntity.ok(skillService.searchSkillsByName(name));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SkillDTO>> getSkillsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(skillService.getSkillsByUserId(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok().build();
    }
}
