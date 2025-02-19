package com.project.backend_fullstack.exception;

public class ExceptionOccuper extends RuntimeException {
	public ExceptionOccuper(Long id) {
		super("non occuper" +id);
	}
}
