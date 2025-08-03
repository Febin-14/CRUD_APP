const API_URL = "http://localhost:3000/api/contacts";

const contactList = document.getElementById("contactList");
const form = document.getElementById("contactForm");

let editId = null;


window.onload = () => {
  fetchContacts();
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name) return alert("Name is required");

  const contact = { name, email, phone };

  if (editId) {
    
    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    editId = null;
    form.querySelector("button").textContent = "Add Contact";
  } else {
    
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
  }

  form.reset();
  fetchContacts();
});

async function fetchContacts() {
  const res = await fetch(API_URL);
  const data = await res.json();

  contactList.innerHTML = "";
  data.forEach((contact) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email || "-"}</td>
      <td>${contact.phone || "-"}</td>
      <td>
        <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.phone}')">✏️</button>
        <button onclick="deleteContact(${contact.id})">❌</button>
      </td>
    `;

    contactList.appendChild(tr);
  });
}

async function deleteContact(id) {
  const confirmed = confirm("Delete this contact?");
  if (!confirmed) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchContacts();
}

function editContact(id, name, email, phone) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;

  editId = id;
  form.querySelector("button").textContent = "Update Contact";
}
