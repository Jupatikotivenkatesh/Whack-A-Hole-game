package com.whackamole.repository;

import com.whackamole.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    
    List<Score> findTop10ByOrderByScoreDescDateDesc();
    
    @Query("SELECT s FROM Score s WHERE s.playerName = :playerName ORDER BY s.score DESC")
    List<Score> findByPlayerNameOrderByScoreDesc(@Param("playerName") String playerName);
    
    @Query("SELECT s FROM Score s WHERE s.playerName = :playerName ORDER BY s.date DESC")
    Optional<Score> findLatestByPlayerName(@Param("playerName") String playerName);
}
