package com.project.backend_fullstack.exception;

public class RessourceNotfoundException extends RuntimeException {
	public RessourceNotfoundException(Long id) {
		super("could not found 'Prof'" +id);
	}
}
 