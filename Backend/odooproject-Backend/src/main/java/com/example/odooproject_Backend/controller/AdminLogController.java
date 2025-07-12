package com.example.odooproject_Backend.controller;

import com.example.odooproject_Backend.models.AdminLog;
import com.example.odooproject_Backend.services.AdminLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/logs")
public class AdminLogController {
    private  final AdminLogService adminLogService;
    public AdminLogController(AdminLogService adminLogService){
        this.adminLogService = adminLogService;
    }
    @PostMapping
    public ResponseEntity<AdminLog> recordAdminAction(@RequestBody AdminLog log) {
        return ResponseEntity.ok(adminLogService.recordAction(log));
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<AdminLog>> getLogsByAdminId(@PathVariable Long adminId) {
        return ResponseEntity.ok(adminLogService.getLogsByAdminId(adminId));
    }
}
