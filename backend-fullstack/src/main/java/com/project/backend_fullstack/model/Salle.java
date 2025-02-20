package com.project.backend_fullstack.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Salle {
	
	@Id
	@GeneratedValue
	private Long id;
	@Column(unique = true) 
	private String codesal;
	private String designation;
	  @OneToMany(mappedBy = "salle",cascade = CascadeType.REMOVE, orphanRemoval = true)
	  @JsonManagedReference("salle-occuper")
	    private List<Occuper> occuperList;
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
	public List<Occuper> getOccuperList() {
		return occuperList;
	}
	public void setOccuperList(List<Occuper> occuperList) {
		this.occuperList = occuperList;
	}
	

	
}
