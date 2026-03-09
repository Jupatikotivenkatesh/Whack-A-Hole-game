# 🎮 Whack-a-Mole Game - MERN Stack

A fun, interactive Whack-a-Mole game built with the MERN stack (MongoDB, Express, React/Vanilla JS, Node.js).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB (local or Atlas account)

### Installation

```bash
# 1. Install dependencies
cd server
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB connection string

# 3. Start backend
npm run dev

# 4. Open frontend
# Open frontend/index.html in your browser
# Or use: python -m http.server 8080 (in frontend folder)
```

## 📁 Project Structure

```
.
├── frontend/           # Frontend (HTML/CSS/JS)
│   ├── index.html     # Game UI
│   ├── style.css      # Styling
│   └── script.js      # Game logic
│
└── server/            # Backend (Express/MongoDB)
    ├── config/        # Database configuration
    ├── models/        # Mongoose schemas
    ├── routes/        # API routes
    ├── .env           # Environment variables
    ├── package.json   # Dependencies
    └── server.js      # Main server file
```

## 🎯 Features

- 3 themes: Classic 🐹, Forest 🦝, Space 👽
- 3 difficulty levels: Easy, Medium, Hard
- Real-time score tracking
- Leaderboard with top 10 scores
- MongoDB database for persistence
- RESTful API with Express
- Responsive design

## 🔌 API Endpoints

```
GET  /api/health              # Health check
POST /api/scores              # Save score
GET  /api/leaderboard         # Get top 10 scores
GET  /api/scores              # Get all scores (with filters)
```

## 🌐 Deployment

### Backend (Render)
```bash
# Deploy to Render
1. Push to GitHub
2. Create Web Service on Render
3. Build: cd server && npm install
4. Start: cd server && npm start
5. Add environment variables
```

### Frontend (Vercel)
```bash
# Deploy to Vercel
cd frontend
vercel --prod
```

## 📚 Documentation

- **START_MERN_PROJECT.md** - Quick start guide (5 minutes)
- **MERN_MIGRATION_GUIDE.md** - Complete migration details
- **MERN_DEPLOYMENT_GUIDE.md** - Production deployment
- **MIGRATION_SUMMARY.md** - Migration summary
- **server/README.md** - Server documentation

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Deployment:** Vercel (frontend), Render (backend)

## 🧪 Testing

```bash
# Test backend
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
- Start MongoDB service
- Check MONGODB_URI in .env
- Verify MongoDB Atlas credentials

### Port Already in Use
- Change PORT in .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

### CORS Error
- Add frontend URL to CORS_ORIGINS in .env
- Restart server

## 💰 Cost

**$0/month** using free tiers:
- MongoDB Atlas: Free (512MB)
- Render: Free (750 hours/month)
- Vercel: Free (100GB bandwidth)

## 📝 License

MIT License - feel free to use this project for learning or portfolio purposes.

## 🎉 Get Started

```bash
cd server
npm install
npm run dev
```

Then open `frontend/index.html` in your browser and start playing! 🎮

---

**Built with ❤️ using the MERN stack**
