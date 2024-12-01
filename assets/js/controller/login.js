import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js";
import { addCSS } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.9/element.js";

addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const REDIRECT_URI = "https://zenversegames-ba223a40f69e.herokuapp.com/auth/google/callback"; // Ubah sesuai dengan URI pengalihan Anda

// Fungsi login dengan username dan password
async function login(username, password) {
    try {
        const response = await fetch('https://zenversegames-ba223a40f69e.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ User_name: username, Password: password })
        });

        const data = await response.json();

        if (response.status === 200) {
            localStorage.setItem('token', data.token);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You will be directed to dashboard",
                timer: 2000,
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.href = 'admin/dashboard.html';
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Username atau password salah!",
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: "warning",
            title: "Login Failed",
            text: "Terjadi kesalahan saat login.",
        });
    }
}

// Fungsi untuk login dengan Google OAuth
function googleLogin() {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;
    window.location.href = googleAuthUrl;
}

// Fungsi untuk menangani token Google yang diterima
function handleCredentialResponse(response) {
    const token = response.credential;
    fetch('https://zenversegames-ba223a40f69e.herokuapp.com/login/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            localStorage.setItem('token', data.token);
            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "You will be directed to the dashboard.",
                timer: 2000,
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.href = 'admin/dashboard.html';
            }, 2000);
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Google login failed!",
            });
        }
    })
    .catch((error) => {
        console.error("Error during Google login:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again.",
        });
    });
}

// Event listener untuk form login
document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

window.onload = () => {
    google.accounts.id.initialize({
        client_id: "161294722609-k3mgi3nbmb9ulrpd8hdd3da3rj05l3jg.apps.googleusercontent.com",
        callback: handleCredentialResponse,
    });

    google.accounts.id.prompt(); // Optional: Show the prompt if needed
};
