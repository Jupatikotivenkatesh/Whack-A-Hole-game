# Whack-a-Mole Express Backend

Express.js backend with MongoDB for the Whack-a-Mole game.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

### Installation

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Start MongoDB (if using local):**
   ```bash
   # Windows
   net start MongoDB

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

4. **Run the server:**
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

5. **Test the API:**
   ```bash
   # Health check
   curl http://localhost:5000/api/health

   # Get leaderboard
   curl http://localhost:5000/api/leaderboard
   ```

## 📁 Project Structure

```
server/
├── config/
│   └── database.js       # MongoDB connection
├── models/
│   └── Score.js          # Score schema
├── routes/
│   └── scores.js         # API routes
├── .env                  # Environment variables (don't commit)
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
├── server.js             # Main server file
└── README.md             # This file
```

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

### Save Score
```
POST /api/scores
Content-Type: application/json

{
  "playerName": "John",
  "score": 150,
  "theme": "classic",
  "difficulty": "medium"
}
```

### Get Leaderboard (Top 10)
```
GET /api/leaderboard
```

### Get All Scores (with filters)
```
GET /api/scores?theme=classic&difficulty=hard&limit=20
```

### Delete Score (optional)
```
DELETE /api/scores/:id
```

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/whackamole`

### Option 2: MongoDB Atlas (Cloud)

1. Create account: https://www.mongodb.com/cloud/atlas
2. Create cluster (free tier available)
3. Get connection string
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whackamole
   ```

## 🌐 CORS Configuration

Update `CORS_ORIGINS` in `.env`:

```bash
# Local development
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Production
CORS_ORIGINS=https://your-frontend.vercel.app
```

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect repository
5. Configure:
   ```
   Build Command: cd server && npm install
   Start Command: cd server && npm start
   ```
6. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   PORT=5000
   CORS_ORIGINS=https://your-frontend.vercel.app
   NODE_ENV=production
   ```

### Deploy to Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`
5. Add environment variables in Railway dashboard

### Deploy to Vercel (Serverless)

1. Install Vercel CLI: `npm install -g vercel`
2. Create `vercel.json` in server folder
3. Deploy: `vercel --prod`

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test save score
curl -X POST http://localhost:5000/api/scores \
  -H "Content-Type: application/json" \
  -d '{"playerName":"Test","score":100,"theme":"classic","difficulty":"easy"}'

# Test leaderboard
curl http://localhost:5000/api/leaderboard
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service

### CORS Error
```
Access to fetch has been blocked by CORS policy
```
**Solution:** Add frontend URL to `CORS_ORIGINS` in `.env`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `.env` or kill process using port 5000

## 📊 Database Schema

```javascript
{
  playerName: String,    // Max 20 characters
  score: Number,         // Min 0
  theme: String,         // 'classic', 'forest', or 'space'
  difficulty: String,    // 'easy', 'medium', or 'hard'
  date: Date,           // Auto-generated
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

## 🔐 Security Notes

- Add authentication for DELETE endpoint in production
- Use environment variables for sensitive data
- Enable rate limiting for production
- Validate all inputs
- Use HTTPS in production

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variables
- **nodemon**: Development auto-reload (dev dependency)

## 🎉 Success!

Your Express backend is now running! Connect it to your frontend and start playing! 🎮
