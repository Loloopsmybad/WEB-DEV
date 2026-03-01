import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp
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

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let activeChatId = null;

export function showChatManager() {
  const dashboardContent = document.getElementById("dashboardContent");

  dashboardContent.innerHTML = `
    <h3>Live Chats</h3>
    <div style="display: flex; gap: 1rem;">
      <div style="width: 30%; border-right: 1px solid #ccc;">
        <h5>Chat Sessions</h5>
        <ul id="chatList" style="list-style: none; padding-left: 0;"></ul>
      </div>
      <div style="flex-grow: 1; display: flex; flex-direction: column;">
        <div id="chatWindow" style="flex-grow: 1; min-height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 1rem; border-radius: 5px;"></div>
        <div style="margin-top: 10px; display: flex;">
          <input type="text" id="adminReplyInput" class="form-control" placeholder="Type a reply..." />
          <button id="sendReplyBtn" class="btn btn-primary" style="margin-left: 10px;">Send</button>
        </div>
      </div>
    </div>
  `;

  const chatList = document.getElementById("chatList");
  const chatWindow = document.getElementById("chatWindow");

  // Load Chat Sessions
  getDocs(collection(db, "chats")).then((snapshot) => {
    console.log("✅ Total chats found:", snapshot.size);

    if (snapshot.empty) {
      chatList.innerHTML = "<li>No chats found.</li>";
      return;
    }

    snapshot.forEach((docSnap) => {
      const chatId = docSnap.id;
      console.log("📩 Chat loaded:", chatId);

      const li = document.createElement("li");
      li.innerHTML = `<button class="btn btn-outline-secondary btn-sm w-100 mb-2" data-id="${chatId}">${chatId}</button>`;
      chatList.appendChild(li);
    });

    // ✅ Add click listeners AFTER chat buttons are in DOM
    setTimeout(() => {
    chatList.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeChatId = btn.dataset.id;
        console.log("📦 Active chat ID set to:", activeChatId);
        loadMessages(activeChatId);
      });
    });
  }, 0); // minimal delay ensures elements are fully added
});

  // Load Messages
  async function loadMessages(chatId) {
    chatWindow.innerHTML = "<em>Loading messages...</em>";

    const messagesQuery = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("timestamp", "asc")
    );

    const snapshot = await getDocs(messagesQuery);
    console.log("🧠 Firestore docs:");
    chatWindow.innerHTML = "";

    snapshot.forEach((doc) => {
      console.log("➡️ ID:", doc.id);
      const msg = doc.data();
      const div = document.createElement("div");
      div.style.marginBottom = "10px";
      div.innerHTML = `<strong>${msg.sender}:</strong> ${msg.text}`;
      chatWindow.appendChild(div);
    });

    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Admin Reply
  document.addEventListener("click", async (e) => {
    if (e.target && e.target.id === "sendReplyBtn") {
      const input = document.getElementById("adminReplyInput");
      const message = input.value.trim();
      if (!message || !activeChatId) return;

      await addDoc(collection(db, "chats", activeChatId, "messages"), {
        text: message,
        sender: "admin",
        timestamp: serverTimestamp()
      });

      input.value = "";
      loadMessages(activeChatId);
    }
  });
}
