# Stage 1: Build the application
FROM maven:3.8.5-openjdk-17 AS build
# This creates a folder called /app and moves into it
WORKDIR /app
# Copy all your GitHub files into that /app folder
COPY . .
# Now Maven will see the pom.xml in /app
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
# Copy the built JAR from the first stage
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
