// Function to check if the user is logged in
export const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token && isTokenValid(token);
};

// Verify the token by decoding it (client-side check)
export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        // Decode the token without verification using atob
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        return payload.exp > currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};

// Check authentication on specific nav clicks
export const handleNavClick = (e, redirectUrl) => {
    if (isLoggedIn()) {
        window.location.href = redirectUrl;
    } else {
        alert('You must be logged in to access this page.');
        window.location.href = 'userLogin.html'; // Change to your login page path
    }
};