package com.whackamole.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreRequest {
    
    @NotBlank(message = "Player name is required")
    private String playerName;
    
    @NotNull(message = "Score is required")
    private Integer score;
    
    private String theme;
    
    private String difficulty;
}
