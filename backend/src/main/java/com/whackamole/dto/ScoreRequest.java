package com.whackamole.dto;

public class ScoreRequest {
    private String playerName;
    private Integer score;
    private String theme;
    private String difficulty;
    
    public ScoreRequest() {}
    
    public ScoreRequest(String playerName, Integer score, String theme, String difficulty) {
        this.playerName = playerName;
        this.score = score;
        this.theme = theme;
        this.difficulty = difficulty;
    }
    
    // Getters and Setters
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    
    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
    
    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
    
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
