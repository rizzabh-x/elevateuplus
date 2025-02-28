const express = require("express");
const axios = require("axios");

const router = express.Router();

// Dummy Course API Endpoint (Replace with actual API if available)
router.get("/courses", async (req, res) => {
  try {
    const query = req.query.skills || "web development";
    
    // Example API: Replace with a real course provider API
    const courses = [
      {
        title: "Full-Stack Web Development with React",
        platform: "Coursera",
        description: "Learn front-end and back-end web development using React and Node.js.",
        image: "https://source.unsplash.com/200x150/?programming",
        url: "https://www.coursera.org/specializations/full-stack-react",
      },
      {
        title: "Machine Learning for Beginners",
        platform: "Udemy",
        description: "An introductory course covering ML concepts with hands-on projects.",
        image: "https://source.unsplash.com/200x150/?machine-learning",
        url: "https://www.udemy.com/course/machine-learning-for-beginners",
      },
    ];

    res.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

module.exports = router;
