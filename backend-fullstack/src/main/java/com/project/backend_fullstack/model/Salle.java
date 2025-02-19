package com.project.backend_fullstack.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Salle {
	
	@Id
	@GeneratedValue
	private Long id;
	@Column(unique = true) 
	private String codesal;
	private String designation;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCodesal() {
		return codesal;
	}
	public void setCodesal(String codesal) {
		this.codesal = codesal;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}

	
}
