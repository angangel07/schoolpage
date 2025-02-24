<?php
// Database credentials
$servername = "localhost";
$username   = "root";       // Default username for XAMPP
$password   = "";           // Default password is empty for XAMPP
$dbname     = "login_db";  // Replace with your actual database name

// Create connection using mysqli
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data safely
$email = $_POST['email'];
$userPassword = $_POST['password'];

// Prepare the SQL statement to prevent SQL injection
$stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch user data from database
    $row = $result->fetch_assoc();
    
    // If you have stored hashed passwords, use password_verify()
    // For example: if (password_verify($userPassword, $row['password'])) { ... }
    // In this example, we're assuming plain text for simplicity.
    if ($row['password'] === $userPassword) {
        echo "Login successful! ";
        // Start a session, set session variables, or redirect as needed
    } else {
        echo "Invalid password.";
    }
} else {
    echo "No user found with that email.";
}

// Close connections
$stmt->close();
$conn->close();
?>
