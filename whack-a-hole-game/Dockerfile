# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — Build
# Uses the official Maven + JDK 17 image — no mvnw wrapper needed
# ─────────────────────────────────────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml first and download dependencies (layer cache)
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -q

# Copy source and build the fat JAR
COPY backend/src ./src
RUN mvn clean package -DskipTests -q

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — Run
# Minimal JRE-only Alpine image
# ─────────────────────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy the packaged JAR from build stage
COPY --from=build /app/target/whackamole-backend.jar app.jar

# Render injects PORT — Spring Boot reads it via server.port=${PORT:8080}
EXPOSE 8080

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
