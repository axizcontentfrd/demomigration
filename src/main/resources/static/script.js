const API_URL = '/api/users';

async function addUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        displayResult(result);
    } catch (error) {
        displayResult({ error: error.message });
    }
}

async function getAllUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();
        displayResult(users);
    } catch (error) {
        displayResult({ error: error.message });
    }
}

async function getUser() {
    const username = document.getElementById('searchUsername').value;
    try {
        const response = await fetch(`${API_URL}/${username}`);
        if (response.ok) {
            const user = await response.json();
            displayResult(user);
        } else {
            displayResult({ error: 'User not found' });
        }
    } catch (error) {
        displayResult({ error: error.message });
    }
}

async function updateUser() {
    const username = document.getElementById('searchUsername').value;
    const newPassword = document.getElementById('password').value;
    try {
        const response = await fetch(`${API_URL}/${username}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: newPassword })
        });
        if (response.ok) {
            const updatedUser = await response.json();
            displayResult(updatedUser);
        } else {
            displayResult({ error: 'Failed to update user' });
        }
    } catch (error) {
        displayResult({ error: error.message });
    }
}

async function deleteUser() {
    const username = document.getElementById('searchUsername').value;
    try {
        const response = await fetch(`${API_URL}/${username}`, { method: 'DELETE' });
        if (response.ok) {
            displayResult({ message: 'User deleted successfully' });
        } else {
            displayResult({ error: 'Failed to delete user' });
        }
    } catch (error) {
        displayResult({ error: error.message });
    }
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
}