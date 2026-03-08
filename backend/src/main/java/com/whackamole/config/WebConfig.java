package com.whackamole.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS Configuration for Production Deployment
 * Allows frontend hosted on different domain to communicate with backend API
 * 
 * IMPORTANT: Update ALLOWED_ORIGINS environment variable in production with your actual Render URL
 * Example: ALLOWED_ORIGINS=https://your-app.onrender.com,http://localhost:8080
 */
@Configuration
public class WebConfig {
    
    @Value("${cors.allowed.origins:http://localhost:8080,http://localhost:3000}")
    private String allowedOrigins;
    
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(allowedOrigins.split(","))
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
                
                // Log CORS configuration for debugging
                System.out.println("CORS enabled for origins: " + allowedOrigins);
            }
        };
    }
}
