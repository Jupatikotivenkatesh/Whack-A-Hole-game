package com.whackamole.controller;

import com.whackamole.dto.ScoreRequest;
import com.whackamole.entity.Score;
import com.whackamole.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScoreController {
    
    @Autowired
    private ScoreRepository scoreRepository;
    
    @PostMapping("/scores")
    public ResponseEntity<Map<String, Object>> saveScore(@RequestBody ScoreRequest request) {
        Score score;
        
        // Create score with or without userId
        if (request.getUserId() != null) {
            score = new Score(
                request.getUserId(),
                request.getPlayerName(),
                request.getScore(),
                request.getTheme(),
                request.getDifficulty()
            );
        } else {
            score = new Score(
                request.getPlayerName(),
                request.getScore(),
                request.getTheme(),
                request.getDifficulty()
            );
        }
        
        // Get player's previous best score
        Optional<Score> previousBest = scoreRepository
            .findByPlayerNameOrderByScoreDesc(request.getPlayerName())
            .stream()
            .findFirst();
        
        Score savedScore = scoreRepository.save(score);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("score", savedScore);
        
        // Determine animation type
        if (previousBest.isPresent()) {
            int previousScore = previousBest.get().getScore();
            int currentScore = request.getScore();
            
            if (currentScore > previousScore) {
                response.put("animation", "celebration");
                response.put("message", "New High Score! 🎉");
            } else if (currentScore == previousScore) {
                response.put("animation", "same");
                response.put("message", "Same as your best! 💪");
            } else {
                response.put("animation", "encouragement");
                response.put("message", "Keep trying! You can do better! 💪");
            }
        } else {
            response.put("animation", "first");
            response.put("message", "First score recorded! 🎮");
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/leaderboard")
    public ResponseEntity<List<Score>> getLeaderboard() {
        List<Score> topScores = scoreRepository.findTop10ByOrderByScoreDescDateDesc();
        return ResponseEntity.ok(topScores);
    }
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Whack-a-Mole API is running");
        return ResponseEntity.ok(response);
    }
}
