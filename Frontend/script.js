const API_URL = "https://multi-agent-assistant-7.onrender.com/chat";
const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Auto-resize textarea
inputEl.addEventListener("input", () => {
  inputEl.style.height = "auto";
  inputEl.style.height = Math.min(inputEl.scrollHeight, 140) + "px";
});

// Enter to send, Shift+Enter for newline
inputEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendChip(el) {
  inputEl.value = el.textContent;
  sendMessage();
}

function removeWelcome() {
  const w = document.getElementById("welcome");
  if (w) w.remove();
}

function appendMessage(role, text, isError = false) {
  removeWelcome();
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;

  const avatar = document.createElement("div");
  avatar.className = `avatar ${role}`;
  avatar.textContent = role === "ai" ? "🤖" : "👤";

  const bubble = document.createElement("div");
  bubble.className = `bubble${isError ? " error-bubble" : ""}`;

  const label = document.createElement("div");
  label.className = "msg-label";
  label.textContent = role === "ai" ? "Assistant" : "You";

  const content = document.createElement("div");
  content.textContent = text;

  bubble.appendChild(label);
  bubble.appendChild(content);
  msg.appendChild(avatar);
  msg.appendChild(bubble);
  messagesEl.appendChild(msg);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return msg;
}

function showTyping() {
  if (document.getElementById("typing")) return;

  removeWelcome();

  const msg = document.createElement("div");
  msg.className = "msg ai";
  msg.id = "typing";

  const avatar = document.createElement("div");
  avatar.className = "avatar ai";
  avatar.textContent = "🤖";

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const typing = document.createElement("div");
  typing.className = "typing-bubble";
  typing.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;

  bubble.appendChild(typing);
  msg.appendChild(avatar);
  msg.appendChild(bubble);
  messagesEl.appendChild(msg);

  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById("typing");
  if (t) t.remove();
}

async function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  appendMessage("user", text);
  inputEl.value = "";
  inputEl.style.height = "auto";
  sendBtn.disabled = true;
  showTyping();

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    removeTyping();

    const reply = data.response || data.answer || data.result;
    appendMessage("ai", reply || "No response received.");

  } catch (err) {
    removeTyping();
    appendMessage("ai", "❌ Server error: " + err.message, true);
  }

  sendBtn.disabled = false;
  inputEl.focus();
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function setGreeting() {
  let hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning ☀️";
  } else if (hour < 18) {
    greeting = "Good Afternoon 🌤️";
  } else {
    greeting = "Good Evening 🌙";
  }

  document.getElementById("greeting").innerText = greeting;
}

setGreeting();
