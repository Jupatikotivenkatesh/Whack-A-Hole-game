# ============================================================================
# Multi-stage Dockerfile for Spring Boot Whack-a-Mole Application
# Optimized for Render deployment with backend subfolder structure
# ============================================================================

# ============================================================================
# STAGE 1: Build Stage
# ============================================================================
FROM maven:3.9.5-eclipse-temurin-17 AS build

# Set working directory to backend subfolder
WORKDIR /app

# Copy only pom.xml first for dependency caching
COPY backend/pom.xml .

# Download dependencies (cached layer if pom.xml doesn't change)
RUN mvn dependency:go-offline -B

# Copy source code
COPY backend/src ./src

# Build the application (skip tests for faster builds)
RUN mvn clean package -DskipTests -B

# Verify JAR was created
RUN ls -la /app/target/ && \
    test -f /app/target/whackamole-backend.jar || \
    (echo "ERROR: JAR file not found!" && exit 1)

# ============================================================================
# STAGE 2: Runtime Stage
# ============================================================================
FROM eclipse-temurin:17-jre-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring

# Set working directory
WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/whackamole-backend.jar app.jar

# Change ownership to non-root user
RUN chown -R spring:spring /app

# Switch to non-root user
USER spring

# Expose port (Render will override with $PORT)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8080}/api/health || exit 1

# JVM optimization flags for containerized environment
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC -XX:+UseStringDeduplication"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar app.jar"]
