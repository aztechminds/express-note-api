const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Array für die Notizen
let notes = [
  { note: "My new Note", autor: "Max Mustermann", date: "2025-01-15" },
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
  let id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(404).send("ID Not Found");
  }

  id -= 1;

  if (id in notes) {
    return res.json(notes[id]);
  } else {
    return res.status(404).send("ID Not Found");
  }
});

// POST /notes - Neue Notiz erstellen
app.post("/notes", (req, res) => {
  console.log(req.body);
  let note = req.body;
  notes.push(note);
  res.send("Note has been stored");
});

// PUT /notes/:id - Notiz aktualisieren
app.put("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let note = req.body;
  if (isNaN(id) || id <= 0) {
    res.status(404).send("ID Not Found");
  }
  id -= 1;

  if (id in notes) {
    notes[id] = note;
    res.send("Note has been updated");
  } else {
    res.status(404).send("ID Not Found");
  }
});

// DELETE /notes/:id - Notiz löschen
app.delete("/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let note = req.body;
  if (isNaN(id) || id <= 0) {
    return res.status(404).send("ID Not Found");
  }
  id -= 1;

  if (id in notes) {
    delete notes[id];
    return res.send("Note has been deleted");
  } else {
    return res.status(404).send("ID Not Found");
  }
});

// Server starten
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
