# 🐳 Docker Deployment Guide - Whack-a-Mole

## ✅ Deployment Verification Complete

Your Spring Boot repository is **fully configured** for Render deployment:

### ✅ application.properties
- ✅ Uses `${DB_URL}` environment variable (no hardcoded localhost)
- ✅ Uses `${DB_USER}` environment variable
- ✅ Uses `${DB_PASSWORD}` environment variable
- ✅ Uses `${PORT}` for dynamic port binding
- ✅ Default values for local development

### ✅ pom.xml
- ✅ `mysql-connector-j` dependency present
- ✅ `spring-boot-maven-plugin` configured
- ✅ `<finalName>whackamole-backend</finalName>` added for clean JAR naming
- ✅ JAR will be: `whackamole-backend.jar` (not `whackamole-backend-1.0.0.jar`)

### ✅ Dockerfile
- ✅ Multi-stage build (optimized size)
- ✅ Correct WORKDIR: `/app` pointing to `backend/` subfolder
- ✅ JAR location: `/app/target/whackamole-backend.jar`
- ✅ Non-root user for security
- ✅ Health check configured
- ✅ JVM optimization for containers

---

## 🚀 Deployment Options

### Option 1: Render with Docker (Recommended)

#### Step 1: Push to Git
```bash
git add Dockerfile .dockerignore render.yaml
git commit -m "Add Docker configuration for Render"
git push
```

#### Step 2: Deploy to Render
1. Go to https://dashboard.render.com
2. Click **New +** → **Web Service**
3. Connect your repository
4. Render will auto-detect the Dockerfile
5. Configure:
   ```
   Name: whackamole-backend
   Environment: Docker
   Dockerfile Path: ./Dockerfile
   Docker Context: .
   ```

#### Step 3: Set Environment Variables
```
DB_URL=jdbc:mysql://your-db-host:3306/whackamole_db?sslMode=VERIFY_IDENTITY
DB_USER=your_username
DB_PASSWORD=your_password
CORS_ALLOWED_ORIGINS=https://whackamole-backend.onrender.com
```

#### Step 4: Deploy
- Click **Create Web Service**
- Wait 5-10 minutes for build
- Access at: `https://whackamole-backend.onrender.com`

---

### Option 2: Render with Maven (Alternative)

If you prefer Maven over Docker:

```
Build Command: cd backend && mvn clean package -DskipTests
Start Command: cd backend && java -jar target/whackamole-backend.jar
```

---

### Option 3: Local Docker Testing

Test Docker build locally before deploying:

#### Build the image
```bash
docker build -t whackamole-backend .
```

#### Run with environment variables
```bash
docker run -p 8080:8080 \
  -e DB_URL="jdbc:mysql://localhost:3306/whackamole_db?useSSL=false" \
  -e DB_USER="root" \
  -e DB_PASSWORD="root" \
  -e PORT="8080" \
  whackamole-backend
```

#### Test the application
```bash
# Health check
curl http://localhost:8080/api/health

# Leaderboard
curl http://localhost:8080/api/leaderboard

# Open in browser
open http://localhost:8080
```

---

## 📋 File Structure Verification

Your project structure is correct for Docker:

```
.
├── Dockerfile                    ✅ Root level (correct)
├── .dockerignore                 ✅ Root level (correct)
├── render.yaml                   ✅ Root level (correct)
└── backend/                      ✅ Subfolder (correct)
    ├── pom.xml                   ✅ Maven config
    ├── src/
    │   └── main/
    │       ├── java/
    │       │   └── com/whackamole/
    │       │       └── WhackAMoleApplication.java
    │       └── resources/
    │           ├── application.properties  ✅ Environment variables
    │           └── static/
    │               └── index.html
    └── target/
        └── whackamole-backend.jar  ✅ Built by Docker
```

---

## 🔍 Dockerfile Explanation

### Stage 1: Build (Maven)
```dockerfile
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app                          # Sets working directory
COPY backend/pom.xml .                # Copy from backend subfolder
COPY backend/src ./src                # Copy source code
RUN mvn clean package -DskipTests     # Build JAR
```

**Result:** JAR created at `/app/target/whackamole-backend.jar`

### Stage 2: Runtime (JRE)
```dockerfile
FROM eclipse-temurin:17-jre-alpine   # Smaller runtime image
WORKDIR /app
COPY --from=build /app/target/whackamole-backend.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Result:** Optimized image (~200MB vs ~800MB with full JDK)

---

## 🐛 Troubleshooting

### Issue: "JAR file not found"
**Cause:** Incorrect WORKDIR or pom.xml location

**Solution:** Dockerfile already handles this correctly:
```dockerfile
WORKDIR /app
COPY backend/pom.xml .    # Copies to /app/pom.xml
COPY backend/src ./src    # Copies to /app/src
```

### Issue: "Cannot connect to database"
**Cause:** Environment variables not set

**Solution:** Verify in Render dashboard:
```bash
DB_URL=jdbc:mysql://...
DB_USER=your_username
DB_PASSWORD=your_password
```

### Issue: "Port already in use"
**Cause:** Another service using port 8080

**Solution:** Use different port:
```bash
docker run -p 9090:8080 -e PORT=8080 whackamole-backend
# Access at http://localhost:9090
```

### Issue: "Build fails with Maven errors"
**Cause:** Dependencies not downloading

**Solution:** Clear Docker cache:
```bash
docker build --no-cache -t whackamole-backend .
```

---

## 🎯 Build Verification

After building, verify the JAR:

```bash
# Build the image
docker build -t whackamole-backend .

# Check JAR exists in image
docker run --rm whackamole-backend ls -la /app/

# Expected output:
# -rw-r--r-- 1 spring spring 45678901 Jan 1 12:00 app.jar
```

---

## 📊 Docker Image Optimization

Your Dockerfile is already optimized:

| Feature | Benefit |
|---------|---------|
| Multi-stage build | Reduces image size by 75% |
| Alpine Linux | Minimal base image (~5MB) |
| Non-root user | Enhanced security |
| Layer caching | Faster rebuilds |
| Health check | Auto-restart on failure |
| JVM tuning | Better container performance |

**Image sizes:**
- Build stage: ~800MB (discarded)
- Final image: ~200MB (deployed)

---

## 🔐 Security Best Practices

Your Dockerfile implements:

1. ✅ **Non-root user:** Runs as `spring` user
2. ✅ **Minimal base:** Alpine Linux (fewer vulnerabilities)
3. ✅ **No secrets in image:** Uses environment variables
4. ✅ **Health checks:** Detects unhealthy containers
5. ✅ **Read-only filesystem:** JAR is immutable

---

## 🚀 CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
deploy:
  stage: deploy
  script:
    - curl -X POST $RENDER_DEPLOY_HOOK
  only:
    - main
```

---

## 📈 Monitoring

### View Logs
```bash
# Render Dashboard
1. Go to your service
2. Click "Logs" tab
3. See real-time Docker logs

# Local Docker
docker logs -f <container-id>
```

### Health Check
```bash
# Render
curl https://whackamole-backend.onrender.com/api/health

# Local
curl http://localhost:8080/api/health
```

### Metrics
```bash
# Container stats
docker stats <container-id>

# Shows: CPU%, Memory, Network I/O
```

---

## 🎉 Deployment Checklist

Before deploying:

- [x] application.properties uses environment variables
- [x] pom.xml has mysql-connector-j dependency
- [x] pom.xml has finalName configured
- [x] Dockerfile created with correct WORKDIR
- [x] .dockerignore created
- [x] render.yaml created (optional)
- [ ] Code pushed to Git repository
- [ ] MySQL database created (PlanetScale/Railway)
- [ ] Environment variables ready

After deploying:

- [ ] Build completes successfully
- [ ] Container starts without errors
- [ ] Health check passes
- [ ] Game loads in browser
- [ ] Can save scores
- [ ] Leaderboard works

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs/docker
- **Docker Best Practices:** https://docs.docker.com/develop/dev-best-practices/
- **Spring Boot Docker:** https://spring.io/guides/topicals/spring-boot-docker/

---

## 🎊 Summary

Your repository is **100% ready** for Render deployment:

✅ Environment variables configured (no hardcoded localhost)  
✅ MySQL connector dependency present  
✅ Clean JAR naming with finalName  
✅ Dockerfile with correct WORKDIR for backend subfolder  
✅ JAR location: `/app/target/whackamole-backend.jar`  
✅ Multi-stage build for optimization  
✅ Security best practices implemented  

**Next step:** Follow `deploy-to-render.md` or use the Dockerfile for deployment! 🚀
