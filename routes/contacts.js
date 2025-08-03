const express = require("express");
const router = express.Router();
const db = require("../db");


// GET all contacts
router.get("/", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new contact
router.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Contact added", id: result.insertId });
    }
  );
});

//  So to Edit contact
router.put("/:id", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Contact updated" });
    }
  );
});

// So to delete
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM contacts WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Contact deleted" });
  });
});

module.exports = router;
