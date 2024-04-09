<?php
// Include your database configuration file
include 'database.php';

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);

// Check if the necessary data is present
if (isset($data['id']) && isset($data['password'])) {
    $id = $data['id'];
    $password = $data['password'];

    // Create a prepared statement
    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");

    // Bind the parameters
    $stmt->bind_param("si", $password, $id);

    // Execute the query
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(array("message" => "User updated successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to update user."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Missing required data."));
}
?>