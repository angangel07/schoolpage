<?php
session_start();

// Database configuration
$servername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName     = "ps_login_db";

// Create a connection
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbName);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data when submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and trim form data
    $full_name     = trim($_POST['full_name']);
    $date_of_birth = trim($_POST['date_of_birth']);
    $gender        = trim($_POST['gender']);
    $phone_number  = trim($_POST['phone_number']);
    $email         = trim($_POST['email']);
    $password      = trim($_POST['password']);
    
    // Basic validation: check if any field is empty
    if (empty($full_name) || empty($date_of_birth) || empty($gender) || empty($phone_number) || empty($email) || empty($password)) {
        die("Please fill in all the fields.");
    }
    
    // Check if the email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        echo "Email already exists. Please choose another email or log in.";
        exit();
    }
    $stmt->close();
    
    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user data (created_at will be set automatically)
    $stmt = $conn->prepare("INSERT INTO users (full_name, date_of_birth, gender, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("ssssss", $full_name, $date_of_birth, $gender, $phone_number, $email, $hashedPassword);
    
    if ($stmt->execute()) {
        echo "Registration successful! You can now <a href='signin.html'>log in</a>.";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
