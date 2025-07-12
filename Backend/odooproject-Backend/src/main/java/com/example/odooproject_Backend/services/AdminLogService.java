package com.example.odooproject_Backend.services;

import com.example.odooproject_Backend.models.AdminLog;
import com.example.odooproject_Backend.repository.AdminLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminLogService {
    private AdminLogRepository adminLogRepository;
    public  AdminLogService(AdminLogRepository adminLogRepository){
        this.adminLogRepository = adminLogRepository;
    }

    public AdminLog recordAction(AdminLog log) {
        return adminLogRepository.save(log);
    }
    public List<AdminLog> getLogsByAdminId(Long adminId) {
        return adminLogRepository.findByAdminId(adminId);
    }
}
