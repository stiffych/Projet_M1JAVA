package com.project.backend_fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend_fullstack.model.Prof;

public interface ProfRepository extends JpaRepository<Prof, Long> {

}
