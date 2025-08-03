const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ GET all contacts
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new contact
router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING id",
      [name, email, phone]
    );
    res.json({ message: "Contact added", id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT to update contact
router.put("/:id", async (req, res) => {
  const { name, email, phone } = req.body;
  const id = req.params.id;
  try {
    await pool.query(
      "UPDATE contacts SET name = $1, email = $2, phone = $3 WHERE id = $4",
      [name, email, phone, id]
    );
    res.json({ message: "Contact updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE a contact
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
