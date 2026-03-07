package com.whackamole.controller;

import com.whackamole.dto.ScoreRequest;
import com.whackamole.entity.Score;
import com.whackamole.repository.ScoreRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ScoreController {
    
    @Autowired
    private ScoreRepository scoreRepository;
    
    @PostMapping(value = "/scores", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Score> saveScore(@Valid @RequestBody ScoreRequest request) {
        Score score = new Score();
        score.setPlayerName(request.getPlayerName());
        score.setScore(request.getScore());
        score.setTheme(request.getTheme());
        score.setDifficulty(request.getDifficulty());
        score.setDate(LocalDateTime.now());
        
        Score savedScore = scoreRepository.save(score);
        return new ResponseEntity<>(savedScore, HttpStatus.CREATED);
    }
    
    @GetMapping("/leaderboard")
    public ResponseEntity<List<Score>> getLeaderboard() {
        List<Score> topScores = scoreRepository.findTop10ByOrderByScoreDescDateDesc();
        List<Score> top10 = topScores.stream().limit(10).toList();
        return ResponseEntity.ok(top10);
    }
}
