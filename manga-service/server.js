const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample manga data
const mangas = [
  {
    id: 1,
    title: 'One Piece',
    author: 'Eiichiro Oda',
    genre: 'Adventure, Fantasy',
    year: 1997,
    volumes: 100,
    description: 'Follow Monkey D. Luffy and his crew in their quest to find the legendary One Piece treasure.',
    rating: 9.2,
    status: 'Ongoing'
  },
  {
    id: 2,
    title: 'Naruto',
    author: 'Masashi Kishimoto',
    genre: 'Action, Adventure',
    year: 1999,
    volumes: 72,
    description: 'A young ninja who seeks recognition from his peers and dreams of becoming the Hokage.',
    rating: 8.8,
    status: 'Completed'
  },
  {
    id: 3,
    title: 'Attack on Titan',
    author: 'Hajime Isayama',
    genre: 'Dark Fantasy, Action',
    year: 2009,
    volumes: 34,
    description: 'Humanity fights for survival against giant humanoid Titans.',
    rating: 9.0,
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Death Note',
    author: 'Tsugumi Ohba',
    genre: 'Mystery, Thriller',
    year: 2003,
    volumes: 12,
    description: 'A high school student discovers a supernatural notebook that allows him to kill anyone.',
    rating: 8.9,
    status: 'Completed'
  },
  {
    id: 5,
    title: 'My Hero Academia',
    author: 'Kohei Horikoshi',
    genre: 'Superhero, Action',
    year: 2014,
    volumes: 38,
    description: 'In a world where most humans have superpowers, a boy born without them dreams of becoming a hero.',
    rating: 8.5,
    status: 'Ongoing'
  }
];

// Routes

// GET /api/mangas - Get all mangas
app.get('/api/mangas', (req, res) => {
  try {
    res.json({
      success: true,
      count: mangas.length,
      data: mangas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mangas',
      error: error.message
    });
  }
});

// GET /api/mangas/:id - Get single manga by ID
app.get('/api/mangas/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const manga = mangas.find(m => m.id === id);
    
    if (!manga) {
      return res.status(404).json({
        success: false,
        message: `Manga with id ${id} not found`
      });
    }
    
    res.json({
      success: true,
      data: manga
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching manga',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'manga-service' });
});

app.listen(PORT, () => {
  console.log(`🎌 Manga Service running on port ${PORT}`);
});
