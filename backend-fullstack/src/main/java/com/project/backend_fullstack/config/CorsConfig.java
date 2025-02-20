package com.project.backend_fullstack.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{

	 @Override
	  public void addCorsMappings(CorsRegistry registry) {
	    registry.addMapping("/**") //route jiaby
	      .allowedOrigins("http://localhost:5173")  // url front
	      .allowedMethods("GET", "POST", "PUT", "DELETE")
	      .allowedHeaders("*")
	      .allowCredentials(true);  // Session
	  }
}
