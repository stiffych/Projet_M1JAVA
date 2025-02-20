package com.project.backend_fullstack.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;

@Entity
public class Occuper {
	
	@Id
	@GeneratedValue
	private Long id;
	
	   private String codeProf;
	    private String codesal;

	    @ManyToOne
	    @JoinColumn(name = "codeProf", referencedColumnName = "codeProf", insertable = false, updatable = false)
	    private Prof prof; // Relation avec Prof

	    @ManyToOne
	    @JoinColumn(name = "codesal", referencedColumnName = "codesal", insertable = false, updatable = false)
	    private Salle salle; // Relation avec Salle
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date date;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Prof getProf() {
		return prof;
	}

	public void setProf(Prof prof) {
		this.prof = prof;
	}

	public Salle getSalle() {
		return salle;
	}

	public void setSalle(Salle salle) {
		this.salle = salle;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getCodeProf() {
		return codeProf;
	}

	public void setCodeProf(String codeProf) {
		this.codeProf = codeProf;
	}

	public String getCodesal() {
		return codesal;
	}

	public void setCodesal(String codesal) {
		this.codesal = codesal;
	}

	
}
