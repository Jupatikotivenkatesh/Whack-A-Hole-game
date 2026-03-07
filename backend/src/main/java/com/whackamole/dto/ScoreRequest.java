package com.whackamole.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ScoreRequest {
    
    @NotBlank(message = "Player name is required")
    private String playerName;
    
    @NotNull(message = "Score is required")
    private Integer score;
    
    private String theme;
    
    private String difficulty;
    
    // Default constructor
    public ScoreRequest() {
    }
    
    // Constructor with all fields
    public ScoreRequest(String playerName, Integer score, String theme, String difficulty) {
        this.playerName = playerName;
        this.score = score;
        this.theme = theme;
        this.difficulty = difficulty;
    }
    
    // Getters and Setters
    
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
        return "ScoreRequest{" +
                "playerName='" + playerName + '\'' +
                ", score=" + score +
                ", theme='" + theme + '\'' +
                ", difficulty='" + difficulty + '\'' +
                '}';
    }
}
