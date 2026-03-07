package com.whackamole.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Score {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Player name is required")
    @Column(name = "player_name", nullable = false)
    private String playerName;
    
    @NotNull(message = "Score is required")
    @Column(name = "score", nullable = false)
    private Integer score;
    
    @Column(name = "date", nullable = false)
    private LocalDateTime date;
    
    @Column(name = "theme")
    private String theme;
    
    @Column(name = "difficulty")
    private String difficulty;
    
    @PrePersist
    protected void onCreate() {
        if (date == null) {
            date = LocalDateTime.now();
        }
    }
}
