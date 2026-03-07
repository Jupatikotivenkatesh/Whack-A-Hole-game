package com.whackamole.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores")
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
    
    // Default constructor
    public Score() {
    }
    
    // Constructor with all fields
    public Score(Long id, String playerName, Integer score, LocalDateTime date, String theme, String difficulty) {
        this.id = id;
        this.playerName = playerName;
        this.score = score;
        this.date = date;
        this.theme = theme;
        this.difficulty = difficulty;
    }
    
    // Automatically set date before persisting
    @PrePersist
    protected void onCreate() {
        if (date == null) {
            date = LocalDateTime.now();
        }
    }
    
    // Getters and Setters
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPlayerName() {
        return playerName;
    }
    
    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }
    
    public Integer getScore() {
        return score;
    }
    
    public void setScore(Integer score) {
        this.score = score;
    }
    
    public LocalDateTime getDate() {
        return date;
    }
    
    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    
    public String getTheme() {
        return theme;
    }
    
    public void setTheme(String theme) {
        this.theme = theme;
    }
    
    public String getDifficulty() {
        return difficulty;
    }
    
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    
    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                ", playerName='" + playerName + '\'' +
                ", score=" + score +
                ", date=" + date +
                ", theme='" + theme + '\'' +
                ", difficulty='" + difficulty + '\'' +
                '}';
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Score score = (Score) o;
        return id != null && id.equals(score.id);
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
