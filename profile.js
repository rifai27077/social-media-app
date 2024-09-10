// profile.js
import { auth, database } from './firebase-config.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const userId = auth.currentUser.uid;
const userRef = ref(database, `users/${userId}`);

function updateProfile(name, status, avatarUrl) {
    set(userRef, {
        name: name,
        status: status,
        avatarUrl: avatarUrl
    }).then(() => {
        console.log('Profile updated successfully');
    }).catch((error) => {
        console.error('Error updating profile:', error);
    });
}

function loadProfile() {
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById('profile-name').textContent = userData.name;
            document.getElementById('profile-status').textContent = userData.status;
            document.getElementById('profile-avatar').src = userData.avatarUrl;
        }
    }).catch((error) => {
        console.error('Error loading profile:', error);
    });
}

document.getElementById('update-profile-button').addEventListener('click', () => {
    const name = document.getElementById('name-input').value;
    const status = document.getElementById('status-input').value;
    const avatarUrl = document.getElementById('avatar-input').value;
    updateProfile(name, status, avatarUrl);
});

// Load profile when page loads
window.onload = loadProfile;
