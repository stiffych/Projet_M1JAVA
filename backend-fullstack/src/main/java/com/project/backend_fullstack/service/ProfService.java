package com.project.backend_fullstack.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.backend_fullstack.model.Prof;
import com.project.backend_fullstack.repository.ProfRepository;

@Service
public class ProfService {
	 @Autowired
	    private ProfRepository profRepository;

	    public List<Prof> searchProfs(String keyword) {
	        return profRepository.findByCodeProfContainingOrNomContainingOrPrenomContaining(keyword, keyword, keyword);
	    }

}
