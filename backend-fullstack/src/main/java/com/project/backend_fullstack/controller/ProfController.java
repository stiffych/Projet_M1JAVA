package com.project.backend_fullstack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend_fullstack.exception.RessourceNotfoundException;
import com.project.backend_fullstack.model.Prof;
import com.project.backend_fullstack.repository.ProfRepository;
import com.project.backend_fullstack.service.ProfService;

@RestController
public class ProfController { 
	
	
	@Autowired
	private ProfRepository profRepository;
	@Autowired
	private ProfService profService;
	
	@PostMapping("/prof")
	Prof newProf (@RequestBody Prof newProf) {
		return profRepository.save(newProf);
	}
	@GetMapping("/profs")
	List<Prof> getAllProfs(){
		return profRepository.findAll();
	}
	@GetMapping("/prof/{id}")
	public Prof getProfById(@PathVariable Long id) {
	    return profRepository.findById(id)
	    		.orElseThrow(() -> new RessourceNotfoundException(id));
	} 
	@PutMapping("profMod/{id}")
	Prof updateProf(@RequestBody Prof newProf,@PathVariable Long id) {
		return profRepository.findById(id)
				.map(prof->{
					prof.setCodeProf(newProf.getCodeProf());
					prof.setGrade(newProf.getGrade());
					prof.setNom(newProf.getNom());
					prof.setPrenom(newProf.getPrenom());
					return profRepository.save(prof);
				}).orElseThrow(() -> new RessourceNotfoundException(id));
	}
	@DeleteMapping("deleteprof/{id}")
	String deleteProf(@PathVariable Long id) {
		if(!profRepository.existsById(id)) {
			throw new RessourceNotfoundException(id);
		}
		profRepository.deleteById(id);
		return "le prof avec l'id "+id+" a été supprimé";
	}
	@GetMapping("/cherchProf")
	public List<Prof> searchProfs(@RequestParam String keyword) {
	    return profService.searchProfs(keyword);
	}

	
}