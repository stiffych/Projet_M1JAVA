package com.project.backend_fullstack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.backend_fullstack.model.Prof;

@Repository
public interface ProfRepository extends JpaRepository<Prof, Long> {
	
	List<Prof>findByCodeProfContainingOrNomContainingOrPrenomContaining(String codeProf,String nom,String Prenom);
}
