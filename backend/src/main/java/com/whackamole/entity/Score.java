package com.whackamole.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
public class Score {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 20)
    private String playerName;
    
    @Column(nullable = false)
    private Integer score;
    
    @Column(nullable = false)
    private LocalDateTime date;
    
    @Column(length = 20)
    private String theme;
    
    @Column(length = 20)
    private String difficulty;
    
    public Score() {
        this.date = LocalDateTime.now();
    }
    
    public Score(String playerName, Integer score, String theme, String difficulty) {
        this.playerName = playerName;
        this.score = score;
        this.theme = theme;
        this.difficulty = difficulty;
        this.date = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    
    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
