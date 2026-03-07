package com.whackamole.repository;

import com.whackamole.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    
    @Query("SELECT s FROM Score s ORDER BY s.score DESC, s.date DESC")
    List<Score> findTop10ByOrderByScoreDescDateDesc();
}
