# 🔐 Environment Variables Configuration

## Required Environment Variables for Production

When deploying to Render (or any cloud platform), set these environment variables:

### Database Configuration

```bash
# MySQL Database Connection URL
DB_URL=jdbc:mysql://your-db-host:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=true&sslMode=VERIFY_IDENTITY&serverTimezone=UTC

# Database Username
DB_USER=your_database_username

# Database Password
DB_PASSWORD=your_database_password
```

### Server Configuration

```bash
# Server Port (automatically set by Render, but can override)
PORT=8080
```

### CORS Configuration

```bash
# Allowed Origins for CORS (comma-separated)
CORS_ALLOWED_ORIGINS=https://your-app.onrender.com,http://localhost:8080
```

---

## Platform-Specific Examples

### PlanetScale (Recommended)

```bash
DB_URL=jdbc:mysql://aws.connect.psdb.cloud/whackamole_db?sslMode=VERIFY_IDENTITY
DB_USER=your_planetscale_username
DB_PASSWORD=pscale_pw_xxxxxxxxxxxxx
CORS_ALLOWED_ORIGINS=https://whackamole-backend.onrender.com
```

### Railway

```bash
DB_URL=jdbc:mysql://containers-us-west-123.railway.app:3306/railway?useSSL=true
DB_USER=root
DB_PASSWORD=railway_password_here
CORS_ALLOWED_ORIGINS=https://whackamole-backend.onrender.com
```

### AWS RDS

```bash
DB_URL=jdbc:mysql://mydb.123456.us-east-1.rds.amazonaws.com:3306/whackamole_db?useSSL=true
DB_USER=admin
DB_PASSWORD=your_rds_password
CORS_ALLOWED_ORIGINS=https://whackamole-backend.onrender.com
```

---

## Local Development (Default Values)

For local development, these defaults are used (no need to set):

```bash
DB_URL=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USER=root
DB_PASSWORD=root
PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000
```

---

## How to Set Environment Variables

### On Render

1. Go to your service dashboard
2. Click **Environment** tab
3. Click **Add Environment Variable**
4. Enter key and value
5. Click **Save Changes** (triggers redeploy)

### On Railway

1. Go to your project
2. Click **Variables** tab
3. Click **New Variable**
4. Enter key and value
5. Click **Add** (auto-deploys)

### On Heroku

```bash
heroku config:set DB_URL="jdbc:mysql://..." -a your-app-name
heroku config:set DB_USER="username" -a your-app-name
heroku config:set DB_PASSWORD="password" -a your-app-name
```

### Local Development (.env file)

Create a `.env` file in your project root (DO NOT commit this):

```bash
DB_URL=jdbc:mysql://localhost:3306/whackamole_db?createDatabaseIfNotExist=true&useSSL=false
DB_USER=root
DB_PASSWORD=root
PORT=8080
CORS_ALLOWED_ORIGINS=http://localhost:8080
```

---

## Security Best Practices

1. ✅ **Never commit credentials to Git**
   - Add `.env` to `.gitignore`
   - Use environment variables in production

2. ✅ **Use strong passwords**
   - Generate random passwords for production
   - Minimum 16 characters with special characters

3. ✅ **Restrict CORS origins**
   - Only allow your actual frontend URLs
   - Don't use `*` (allow all) in production

4. ✅ **Enable SSL for database connections**
   - Use `useSSL=true` in production
   - Use `sslMode=VERIFY_IDENTITY` for PlanetScale

5. ✅ **Rotate credentials regularly**
   - Change passwords every 90 days
   - Update environment variables after rotation

---

## Verification

After setting environment variables, verify they're loaded:

### Check Application Logs

Look for these lines in your Render logs:

```
CORS enabled for origins: https://your-app.onrender.com
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
Started WhackAMoleApplication in 8.123 seconds
```

### Test Database Connection

```bash
# From Render shell (if available)
curl http://localhost:8080/api/health

# From your machine
curl https://your-app.onrender.com/api/health
```

Expected response:
```json
{
  "status": "UP",
  "database": "Connected"
}
```

---

## Troubleshooting

### Error: "Could not create connection to database server"

**Cause:** Database URL, username, or password is incorrect

**Solution:**
1. Verify `DB_URL` format is correct
2. Check `DB_USER` and `DB_PASSWORD` match your database
3. Ensure database server is running and accessible
4. Check firewall rules allow connections from Render

### Error: "Access denied for user"

**Cause:** Wrong username or password

**Solution:**
1. Double-check `DB_USER` and `DB_PASSWORD`
2. Verify user has permissions on the database
3. For PlanetScale, regenerate password if needed

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Cause:** Frontend URL not in `CORS_ALLOWED_ORIGINS`

**Solution:**
1. Add your Render URL to `CORS_ALLOWED_ORIGINS`
2. Format: `https://your-app.onrender.com` (no trailing slash)
3. Separate multiple URLs with commas
4. Redeploy after updating

---

## Quick Copy-Paste Template

For Render deployment, copy this template and fill in your values:

```bash
DB_URL=jdbc:mysql://YOUR_DB_HOST:3306/whackamole_db?sslMode=VERIFY_IDENTITY
DB_USER=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
CORS_ALLOWED_ORIGINS=https://YOUR_APP.onrender.com
```

Replace:
- `YOUR_DB_HOST` → Your database host (e.g., `aws.connect.psdb.cloud`)
- `YOUR_USERNAME` → Your database username
- `YOUR_PASSWORD` → Your database password
- `YOUR_APP` → Your Render app name

---

**All set! Your environment variables are configured for production deployment. 🚀**
