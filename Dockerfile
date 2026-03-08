# Stage 1: Build
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy everything from your repo
COPY . .

# This command finds where the pom.xml is and moves into that folder to build
RUN find . -name "pom.xml" -execdir mvn clean package -DskipTests \;

# Stage 2: Run
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app

# This copies the generated JAR file regardless of which folder it was built in
COPY --from=build /app/**/target/*.jar app.jar

EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
