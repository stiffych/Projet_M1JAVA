package com.project.backend_fullstack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend_fullstack.model.Prof;

public interface ProfRepository extends JpaRepository<Prof, Long> {
	
	List<Prof>findByCodeProfContainingOrNomContainingOrPrenomContaining(String codeProf,String nom,String Prenom);
}
