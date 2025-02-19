package com.project.backend_fullstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend_fullstack.model.Occuper;

public interface OccuperRepository extends JpaRepository<Occuper, Long> {

}
