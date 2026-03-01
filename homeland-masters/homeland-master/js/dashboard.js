// dashboard.js
import { showChatManager } from '../js/admin-chat.js';
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCYVrQQtwuKZ4EpbyokBR3OmgWoNtnsAtc",
  authDomain: "mayfairproperties-00.firebaseapp.com",
  projectId: "mayfairproperties-00",
  storageBucket: "mayfairproperties-00.appspot.com",
  messagingSenderId: "288069767491",
  appId: "1:288069767491:web:40bbb396d0d4a93a391ff6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ========= SHOW DELETE PROPERTIES =========
window.showDeleteProperties = async () => {
  const dashboardContent = document.getElementById("dashboardContent");

  dashboardContent.innerHTML = `
    <h3>Delete Properties</h3>
    <div class="property-grid" id="propertyCardsContainer"></div>
  `;

  const container = document.getElementById("propertyCardsContainer");
  const snapshot = await getDocs(collection(db, "properties"));

  snapshot.forEach((docSnap) => {
    const p = docSnap.data();
    const id = docSnap.id;

    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.title}" style="width:100%; border-radius: 8px;" />
      <h4>${p.title}</h4>
      <p><strong>Type:</strong> ${p.type}</p>
      <p><strong>Offer:</strong> ${p.offer}</p>
      <p><strong>City:</strong> ${p.city}</p>
      <p><strong>Price:</strong> ₹${p.price}</p>
      <button class="btn btn-danger btn-sm mt-2 delete-btn" data-id="${id}">Delete</button>
    `;

    container.appendChild(card);
  });

  // Handle deletes
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const confirmDelete = confirm("Are you sure you want to delete this property?");
      if (!confirmDelete) return;

      await deleteDoc(doc(db, "properties", id));
      alert("Deleted successfully!");
      showDeleteProperties(); // Refresh the list
    });
  });
};

// ========= SHOW ADD PROPERTY FORM =========
window.showAddPropertyForm = function () {
  const dashboardContent = document.getElementById("dashboardContent");

  dashboardContent.innerHTML = `
    <h3>Add New Property</h3>
    <form id="addPropertyForm" class="glass-form">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" required />
      </div>
      <div class="mb-3">
        <label for="type" class="form-label">Type</label>
        <select class="form-select" id="type" required>
          <option value="condo">Condo</option>
          <option value="commercial">Commercial</option>
          <option value="land">Land</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="offer" class="form-label">Offer</label>
        <select class="form-select" id="offer" required>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="city" class="form-label">City</label>
        <input type="text" class="form-control" id="city" required />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input type="text" class="form-control" id="price" required />
      </div>
      <div class="mb-3">
        <label for="imageUrl" class="form-label">Image URL</label>
        <input type="text" class="form-control" id="imageUrl" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Property</button>
    </form>
  `;

  const form = document.getElementById("addPropertyForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const type = document.getElementById("type").value;
    const offer = document.getElementById("offer").value;
    const city = document.getElementById("city").value;
    const price = document.getElementById("price").value;
    const imageUrl = document.getElementById("imageUrl").value;

    try {
      await addDoc(collection(db, "properties"), {
        title,
        type,
        offer,
        city,
        price,
        imageUrl,
        createdAt: new Date()
      });
      alert("Property added!");
      showDeleteProperties(); // optional refresh
    } catch (err) {
      console.error("Error adding property:", err);
      alert("Failed to add property.");
    }
  });
};

// ========= BUTTON CLICK HANDLERS =========
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addPropertyBtn");
  const deleteBtn = document.getElementById("deletePropertiesBtn");
  const chatBtn = document.getElementById("manageChatsBtn");

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      showAddPropertyForm();
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      showDeleteProperties();
    });
  }

  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      showChatManager();
    });
  }

  console.log("dashboard.js loaded");
});
