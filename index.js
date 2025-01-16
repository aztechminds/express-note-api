const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

// Array für die Notizen
let notes = [
  { id: 1, note: "My new Note", autor: "Max Mustermann", date: "2025-01-15" },
];

app.get("/", (request, response) => {
  response.send("Welcome to Express Notes API");
});

// GET /notes - Alle Notizen abrufen
app.get("/notes", (req, res) => {
  res.json(notes);
});

// GET /notes/:id - Notiz nach ID abrufen
app.get("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let findNote = null;
  notes.forEach((note) => {
    if (note.id === id) {
      findNote = note;
    }
  });

  // const note = notes.find((note) => note.id === id);
  res.json(findNote);
});

// POST /notes - Neue Notiz erstellen
app.post("/notes", (req, res) => {
  const lastId = notes[notes.length - 1].id;
  console.log(lastId);
  const newNote = {
    id: lastId + 1,
    note: req.body.note,
    autor: req.body.autor,
    date: new Date(),
  };
  notes.push(newNote);
  res.send("Note has been stored");
});

// PUT /notes/:id - Notiz aktualisieren
app.put("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let updateNote = null;
  notes.forEach((note) => {
    if (note.id === id) {
      updateNote = note;
    }
  });

  if (updateNote !== null) {
    updateNote.note = req.body.note;
    updateNote.autor = req.body.autor;
    updateNote.date = new Date();
  }
  res.send(updateNote);
});

// DELETE /notes/:id - Notiz löschen
app.delete("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  console.log(notes);
  res.send(notes);
});

// Server starten
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
