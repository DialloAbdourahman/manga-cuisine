const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Sample cuisine data
const cuisines = [
  {
    id: 1,
    name: 'Italian',
    origin: 'Italy',
    popularDishes: ['Pizza', 'Pasta', 'Risotto', 'Lasagna'],
    description: 'Known for its regional diversity, Italian cuisine is characterized by its simplicity and use of fresh ingredients.',
    characteristics: 'Tomatoes, olive oil, garlic, fresh herbs',
    difficulty: 'Medium',
    popularity: 9.5
  },
  {
    id: 2,
    name: 'Japanese',
    origin: 'Japan',
    popularDishes: ['Sushi', 'Ramen', 'Tempura', 'Teriyaki'],
    description: 'Emphasizes seasonal ingredients, presentation, and the natural flavors of food.',
    characteristics: 'Rice, seafood, soy sauce, miso',
    difficulty: 'Hard',
    popularity: 9.3
  },
  {
    id: 3,
    name: 'Mexican',
    origin: 'Mexico',
    popularDishes: ['Tacos', 'Enchiladas', 'Guacamole', 'Quesadillas'],
    description: 'A vibrant cuisine with complex flavors from indigenous and Spanish influences.',
    characteristics: 'Corn, beans, chili peppers, avocado',
    difficulty: 'Medium',
    popularity: 9.0
  },
  {
    id: 4,
    name: 'French',
    origin: 'France',
    popularDishes: ['Coq au Vin', 'Croissant', 'Ratatouille', 'Bouillabaisse'],
    description: 'Renowned for its finesse and sophisticated cooking techniques.',
    characteristics: 'Butter, wine, cream, fresh herbs',
    difficulty: 'Hard',
    popularity: 8.8
  },
  {
    id: 5,
    name: 'Thai',
    origin: 'Thailand',
    popularDishes: ['Pad Thai', 'Green Curry', 'Tom Yum', 'Mango Sticky Rice'],
    description: 'Known for balancing sweet, sour, salty, and spicy flavors in every dish.',
    characteristics: 'Lemongrass, fish sauce, coconut milk, chili',
    difficulty: 'Medium',
    popularity: 8.9
  },
  {
    id: 6,
    name: 'Indian',
    origin: 'India',
    popularDishes: ['Butter Chicken', 'Biryani', 'Samosa', 'Tikka Masala'],
    description: 'Rich in spices and diverse regional variations with vegetarian and non-vegetarian options.',
    characteristics: 'Curry spices, rice, lentils, yogurt',
    difficulty: 'Medium',
    popularity: 8.7
  }
];

// Routes

// GET /api/cuisines - Get all cuisines
app.get('/api/cuisines', (req, res) => {
  try {
    res.json({
      success: true,
      count: cuisines.length,
      data: cuisines
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cuisines',
      error: error.message
    });
  }
});

// GET /api/cuisines/:id - Get single cuisine by ID
app.get('/api/cuisines/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cuisine = cuisines.find(c => c.id === id);
    
    if (!cuisine) {
      return res.status(404).json({
        success: false,
        message: `Cuisine with id ${id} not found`
      });
    }
    
    res.json({
      success: true,
      data: cuisine
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cuisine',
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'cuisine-service' });
});

app.listen(PORT, () => {
  console.log(`🍜 Cuisine Service running on port ${PORT}`);
});
