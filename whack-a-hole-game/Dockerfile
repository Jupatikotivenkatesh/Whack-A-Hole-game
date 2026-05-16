# =============================================================================
# Whack-a-Mole — Root Dockerfile for Render Docker deployment
#
# Render settings:
#   Environment      → Docker
#   Root Directory   → whack-a-hole-game        (your repo subfolder)
#   Dockerfile Path  → ./Dockerfile             (this file)
#   Docker Context   → .                        (dot)
# =============================================================================

# ── Stage 1: Build ────────────────────────────────────────────────────────────
# Official Maven 3.9 + JDK 17 image — no mvnw needed
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# 1. Copy pom.xml alone first so Maven dependency download is a cached layer.
#    Only re-runs when pom.xml changes.
COPY backend/pom.xml pom.xml

# 2. Download all dependencies into the local Maven cache
RUN mvn dependency:resolve dependency:resolve-plugins -q

# 3. Copy the full source tree
COPY backend/src src/

# 4. Build the fat JAR — skip tests (no DB available at build time)
RUN mvn package -DskipTests -q

# ── Stage 2: Run ──────────────────────────────────────────────────────────────
# Slim JRE-only image (~85 MB vs ~400 MB for JDK)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Run as non-root for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only the packaged JAR from the build stage
COPY --from=build /app/target/whackamole-backend.jar app.jar

# Render dynamically assigns PORT — Spring Boot reads it via ${PORT:8080}
EXPOSE 8080

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
