package com.jkv.whackamole.controller;

import com.jkv.whackamole.dto.ScoreRequest;
import com.jkv.whackamole.model.Score;
import com.jkv.whackamole.repository.ScoreRepository;
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

        if (request.getUserId() != null) {
            score = new Score(request.getUserId(), request.getPlayerName(),
                    request.getScore(), request.getTheme(), request.getDifficulty());
        } else {
            score = new Score(request.getPlayerName(), request.getScore(),
                    request.getTheme(), request.getDifficulty());
        }

        Optional<Score> previousBest = scoreRepository
                .findByPlayerNameOrderByScoreDesc(request.getPlayerName())
                .stream().findFirst();

        Score savedScore = scoreRepository.save(score);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("score", savedScore);

        if (previousBest.isPresent()) {
            int prev = previousBest.get().getScore();
            int curr = request.getScore();
            if (curr > prev) {
                response.put("animation", "celebration");
                response.put("message", "New High Score! 🎉");
            } else if (curr == prev) {
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
        return ResponseEntity.ok(scoreRepository.findTop10ByOrderByScoreDescDateDesc());
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Mole Mayhem API is running");
        return ResponseEntity.ok(response);
    }
}
