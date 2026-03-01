document.addEventListener("DOMContentLoaded", function () {
  // ✅ Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyCYVrQQtwuKZ4EpbyokBR3OmgWoNtnsAtc",
    authDomain: "mayfairproperties-00.firebaseapp.com",
    projectId: "mayfairproperties-00",
    storageBucket: "mayfairproperties-00.appspot.com",
    messagingSenderId: "288069767491",
    appId: "1:288069767491:web:40bbb396d0d4a93a391ff6"
  };

  // ✅ Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // ✅ Generate session chat ID
  let chatId = sessionStorage.getItem("chatId");
  if (!chatId) {
    chatId = "chat_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
    sessionStorage.setItem("chatId", chatId);
  }

  db.collection("chats").doc(chatId).set({
  createdAt: firebase.firestore.FieldValue.serverTimestamp()
}, { merge: true });

  // ✅ Toggle chat box
  const toggleButton = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("floating-chat-box");
  if (toggleButton && chatBox) {
    toggleButton.addEventListener("click", () => {
      chatBox.classList.toggle("hidden");
    });
  }

  // ✅ Send message
  const sendBtn = document.getElementById("send-message-btn");
  const input = document.getElementById("floating-input");
  const messagesDiv = document.getElementById("floating-messages");

  if (sendBtn && input && messagesDiv) {
    sendBtn.addEventListener("click", () => {
      const message = input.value.trim();
      if (!message) return;

      db.collection("chats").doc(chatId).collection("messages").add({
        text: message,
        sender: "user",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
        .then(() => {
          showChatPopup("Message sent!", "success");
          input.value = "";
        })
        .catch((err) => {
          console.error("Failed to send:", err);
          showChatPopup("Failed to send message", "error");
        });
    });

    // ✅ Real-time message loading
    db.collection("chats").doc(chatId).collection("messages")
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        messagesDiv.innerHTML = "";
        snapshot.forEach(doc => {
          const msg = doc.data();
          const icon = msg.sender === "admin" ? "🛠️" : "🙋";
          messagesDiv.innerHTML += `<div>${icon} ${msg.text}</div>`;
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      });
  }

  // ✅ Chat status popup
  function showChatPopup(message, type = "success") {
    const popup = document.getElementById("chat-popup");
    if (!popup) return;
    popup.textContent = message;
    popup.className = `chat-popup ${type}`;
    popup.classList.remove("hidden");
    setTimeout(() => popup.classList.add("hidden"), 3000);
  }
});
