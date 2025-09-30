const express = require('express');
const app = express();
const { v4: uuidv4 } = require("uuid");
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// In-memory storage
let users = [];

/**
 * POST /users - Create a new user
 */
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = { id: uuidv4(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


/**
 * GET /users/:id - Retrieve a user
 */
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

/**
 * PUT /users/:id - Update a user
 */
app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  users[userIndex] = { id: req.params.id, name, email };
  res.json(users[userIndex]);
});

/**
 * DELETE /users/:id - Delete a user
 */
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing