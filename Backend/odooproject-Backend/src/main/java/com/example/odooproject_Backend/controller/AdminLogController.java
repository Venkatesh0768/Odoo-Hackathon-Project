package com.example.odooproject_Backend.controller;

import com.example.odooproject_Backend.dto.AdminLogDTO;
import com.example.odooproject_Backend.services.AdminLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/logs")
@RequiredArgsConstructor
@CrossOrigin(
        origins = "http://localhost:5173",

        allowCredentials = "true"
)
public class AdminLogController {

    private final AdminLogService adminLogService;

    @PostMapping
    public ResponseEntity<AdminLogDTO> recordAdminAction(@RequestBody AdminLogDTO logDTO) {
        return ResponseEntity.ok(adminLogService.recordAction(logDTO));
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<AdminLogDTO>> getLogsByAdminId(@PathVariable Long adminId) {
        return ResponseEntity.ok(adminLogService.getLogsByAdminId(adminId));
    }
}
