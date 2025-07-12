package com.example.odooproject_Backend.repository;

import com.example.odooproject_Backend.models.AdminLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminLogRepository extends JpaRepository<AdminLog, Long> {
    List<AdminLog> findByAdminId(Long adminId);
}
