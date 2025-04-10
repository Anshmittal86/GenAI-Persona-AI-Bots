// public/script.js
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const title = document.getElementById('chat-title');

const selectedTutor = localStorage.getItem('selectedTutor') || 'Hitesh Sir';
title.textContent = `Chat with ${selectedTutor}`;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  addMessage(userMsg, 'user');
  input.value = '';

  const typingMsg = addMessage(`${selectedTutor} is typing...`, 'bot');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg, persona: selectedTutor })
    });

    const data = await response.json();
    typingMsg.remove();
    addMessage(data.reply, 'bot');
  } catch (err) {
    typingMsg.remove();
    addMessage('Error: Could not connect to AI server.', 'bot');
  }
});

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}
