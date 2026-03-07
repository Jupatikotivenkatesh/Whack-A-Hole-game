# Whack-a-Mole Backend Design

## Database Schema

### Leaderboard Table: `scores`

| Column Name   | Data Type      | Constraints                    | Description                          |
|---------------|----------------|--------------------------------|--------------------------------------|
| id            | BIGINT         | PRIMARY KEY, AUTO_INCREMENT    | Unique identifier for each score     |
| player_name   | VARCHAR(255)   | NOT NULL                       | Name of the player                   |
| score         | INT            | NOT NULL                       | Player's final score                 |
| date          | DATETIME       | NOT NULL                       | Timestamp when score was recorded    |
| theme         | VARCHAR(50)    | NULL                           | Game theme selected                  |
| difficulty    | VARCHAR(20)    | NULL                           | Difficulty level (easy/medium/hard)  |

### Indexes
- Primary index on `id`
- Composite index on `(score DESC, date DESC)` for leaderboard queries

## API Endpoints

### 1. POST /api/scores
**Purpose**: Save a new score to the leaderboard

**Request Body**:
```json
{
  "playerName": "string (required)",
  "score": "integer (required)",
  "theme": "string (optional)",
  "difficulty": "string (optional)"
}
```

**Response**: 
- Status: 201 Created
- Body: Created Score object with generated ID and timestamp

**Example**:
```json
{
  "id": 1,
  "playerName": "John Doe",
  "score": 150,
  "date": "2026-03-07T10:30:00",
  "theme": "space",
  "difficulty": "hard"
}
```

### 2. GET /api/leaderboard
**Purpose**: Retrieve top 10 highest scores

**Response**:
- Status: 200 OK
- Body: Array of top 10 Score objects ordered by score (DESC) and date (DESC)

**Example**:
```json
[
  {
    "id": 5,
    "playerName": "Alice",
    "score": 200,
    "date": "2026-03-07T11:00:00",
    "theme": "cyber",
    "difficulty": "hard"
  },
  {
    "id": 3,
    "playerName": "Bob",
    "score": 180,
    "date": "2026-03-07T10:45:00",
    "theme": "space",
    "difficulty": "medium"
  }
]
```

## Architecture

```
Frontend (HTML/JS)
    ↓
REST API (Spring Boot)
    ↓
JPA/Hibernate
    ↓
MySQL Database
```

## Components

1. **Score Entity**: JPA entity representing the scores table
2. **ScoreRepository**: Spring Data JPA repository for database operations
3. **ScoreController**: REST controller exposing API endpoints
4. **ScoreRequest DTO**: Data transfer object for score submission

## Setup Instructions

1. Install MySQL and create database (auto-created by Spring Boot)
2. Update `application.properties` with your MySQL credentials
3. Run Spring Boot application: `mvn spring-boot:run`
4. Backend will be available at `http://localhost:8080`
5. Update frontend to point to backend API endpoints
