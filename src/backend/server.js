const FIREBASE_URL =
  "https://todolist-a95bd-default-rtdb.europe-west1.firebasedatabase.app";

const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");
const axios = require("axios");

app.use(
  cors({
    origin: "https://git-vercel-zeta.vercel.app/",
  })
);
app.use(express.json());

// Route pour récupérer toutes les tâches
app.get("/api/todos", async (req, res) => {
  try {
    const response = await axios.get(`${FIREBASE_URL}/.json`);
    const todos = response.data || {};
    const uid = req.query.uid;

    const list = Object.entries(todos).map(([id, val]) => ({ id, ...val }));
    const filtered = uid ? list.filter((todo) => todo.uid === uid) : list;

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Erreur Firebase" });
  }
});

// Route pour ajouter une tâche
app.post("/api/todos", async (req, res) => {
  try {
    const { title, uid } = req.body;
    if (!title || !uid) {
      return res.status(400).json({ error: "title et uid requis" });
    }

    const newTodo = { title, uid, completed: false };
    const response = await axios.post(`${FIREBASE_URL}/.json`, newTodo);

    res.status(201).json({ id: response.data.name, ...newTodo });
  } catch (error) {
    res.status(500).json({ error: "Erreur Firebase" });
  }
});

// Route pour mettre à jour une tâche
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (completed !== undefined) updateData.completed = completed;

    await axios.patch(`${FIREBASE_URL}/${id}.json`, updateData);
    res.json({ id, ...updateData });
  } catch (error) {
    res.status(500).json({ error: "Erreur Firebase lors de la mise à jour" });
  }
});

// Route pour supprimer une tâche
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await axios.delete(`${FIREBASE_URL}/${id}.json`);
    res.json({ message: "Todo supprimé", id });
  } catch (error) {
    res.status(500).json({ error: "Erreur Firebase lors de la suppression" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
