import { auth, database } from './firebase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const chatsRef = ref(database, 'chats');

function loadChats() {
    onValue(chatsRef, (snapshot) => {
        const chatList = document.getElementById('chat-list');
        chatList.innerHTML = '';
        snapshot.forEach((childSnapshot) => {
            const chatData = childSnapshot.val();
            const chatId = childSnapshot.key;
            const chatElement = document.createElement('div');
            chatElement.textContent = `Chat with: ${chatData.name}`;
            chatElement.style.cursor = 'pointer';
            chatElement.addEventListener('click', () => {
                localStorage.setItem('selectedChat', chatId);
                window.location.href = "chat.html";
            });
            chatList.appendChild(chatElement);
        });
    });
}

document.getElementById('new-chat').addEventListener('click', () => {
    window.location.href = "new-chat.html";
});

// Load chats when page loads
window.onload = loadChats;
