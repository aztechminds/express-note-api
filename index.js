const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;

app.use(bodyParser.json());

// Array für die Notizen
let notes = [
  {id: 1, note: "My new Note", autor: "Max Mustermann", date: "2025-01-15"},
  {id: 2, note: "My new Note", autor: "Max Mustermann", date: "2025-01-15"},
  {id: 3, note: "My new Note", autor: "Max Mustermann", date: "2025-01-15"},
  {id: 4, note: "My new Note", autor: "Max Mustermann", date: "2025-01-15"},
  {id: 5, note: "My new Note", autor: "Max Mustermann", date: "2025-01-15"},
  {id: 6, note: "My new Note", autor: "Max Mustermann", date: "2025-01-15"},  
];

let nextId = 1; // ID-Generator

app.get("/", (request, response) => {
  response.send("Welcome to Express Notes API");
});

// Server starten
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

// GET /notes - Alle Notizen abrufen
app.get("/notes", (req, res) => {
  res.json(notes);
  console.log(notes);
});

// GET /notes/:id - Notiz nach ID abrufen
app.get("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (note) {
    res.json(note);
  } else {
    res.status(404).send({ error: "Note not found" });
  }
});

// POST /notes - Neue Notiz erstellen
app.post("/notes", (req, res) => {
  const { note, autor, date } = req.body;
  if (!note || !autor || !date) {
    return res.status(400).send({ error: "Invalid note format" });
  }
  const newNote = { id: nextId++, note, autor, date };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT /notes/:id - Notiz aktualisieren
app.put("/notes/:id", (req, res) => {
  const { note, autor, date } = req.body;
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === noteId);

  if (index === -1) {
    return res.status(404).send({ error: "Note not found" });
  }

  if (!note || !autor || !date) {
    return res.status(400).send({ error: "Invalid note format" });
  }

  notes[index] = { id: noteId, note, autor, date };
  res.json(notes[index]);
});

// DELETE /notes/:id - Notiz löschen
app.delete("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === noteId);

  if (index === -1) {
    return res.status(404).send({ error: "Note not found" });
  }

  const deletedNote = notes.splice(index, 1);
  res.json(deletedNote);
});
