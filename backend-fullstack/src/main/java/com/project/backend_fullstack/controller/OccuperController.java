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
import com.project.backend_fullstack.model.Occuper;
import com.project.backend_fullstack.repository.OccuperRepository;

@RestController
public class OccuperController {
	
	@Autowired
	private OccuperRepository occuperRepository;
	
	@PostMapping("/occuper")
	Occuper newOccuper(@RequestBody Occuper newOccuper) {
		return occuperRepository.save(newOccuper);
	}
	
	@GetMapping("/occupers")
	List<Occuper> getAllOccuper(){
		return occuperRepository.findAll();
	}
	@GetMapping("/occupers/{id}")
	Occuper getOccuperById(@PathVariable Long id) {
		return occuperRepository.findById(id)
				.orElseThrow(()->new ExceptionOccuper (id));
	}
	@PutMapping("/occuperMod/{id}")
	Occuper updateOccuper(@RequestBody Occuper newOccuper,@PathVariable Long id) {
		return occuperRepository.findById(id)
				.map(occuper ->{
					occuper.setProf(newOccuper.getProf());
					occuper.setSalle(newOccuper.getSalle());
					occuper.setDate(newOccuper.getDate());
					return occuperRepository.save(occuper);
				}).orElseThrow(()->new ExceptionOccuper(id));
	}
	@DeleteMapping("/deleteoccuper/{id}")
	String deleteOccuper(@PathVariable Long id) {
		if(!occuperRepository.existsById(id)) {
			throw new ExceptionOccuper(id);
		}
		occuperRepository.deleteById(id);
		return "la salle est libre maintenant";
	}

}
