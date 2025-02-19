package com.project.backend_fullstack.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend_fullstack.exception.ExceptionOccuper;
import com.project.backend_fullstack.model.Salle;
import com.project.backend_fullstack.repository.SalleRepository;

@RestController
public class SalleController {
	
	@Autowired 
	 private SalleRepository salleRepository;
	
	@PostMapping("/salle")
	Salle newSalle(@RequestBody Salle newSalle) {
		return salleRepository.save(newSalle);
	}
	@GetMapping("/salles")
	List<Salle> getAllSalle(){
		return salleRepository.findAll();
	}
	@GetMapping("/salles/{id}")
	Salle getsalleByID(Long id) {
		return salleRepository.findById(id)
				.orElseThrow(()-> new ExceptionOccuper(id));
	}
	@PutMapping("/salleMod/{id}")
	Salle updatesalle(@RequestBody Salle newSalle, @PathVariable Long id) {
		return salleRepository.findById(id)
				.map(salle ->{
					salle.setCodesal(newSalle.getCodesal());
					salle.setDesignation(newSalle.getDesignation());
					return salleRepository.save(salle);
				}).orElseThrow(()-> new ExceptionOccuper(id));
	}
	@DeleteMapping("/deletesalle/{id}")
	String deleteSalle(@PathVariable Long id) {
		if(! salleRepository.existsById(id)) {
			throw new ExceptionOccuper(id);
		}
		salleRepository.deleteById(id);
		return "la salle avec l'id"+"est supprimé avec succès";
	}

}
