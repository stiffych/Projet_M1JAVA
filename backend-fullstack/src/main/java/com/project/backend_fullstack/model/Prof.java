package com.project.backend_fullstack.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Prof {
	
	@Id
	@GeneratedValue
	private Long id;
	@Column(unique = true) 
	private String codeProf;
	private String nom;
	private String prenom;
	private String grade;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCodeProf() {
		return codeProf;
	}
	public void setCodeProf(String codeProf) {
		this.codeProf = codeProf;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	
	
}
