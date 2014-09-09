<?php

session_start();
require_once('lib/twitteroauth/twitteroauth.php');
require_once('config/config.php');


$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
$response = null;
$idTwitter = 0;
if (isset($_POST['id'])) {
    $idTwitter = $_POST['id'];
} else if (isset($_GET['id'])) {
    $idTwitter = $_GET['id'];
}

if ($idTwitter) {
    if (is_numeric($idTwitter)) {
        $response = $connection->get('users/show', array('user_id' => $idTwitter));
    } else {
        $response = $connection->get('users/show', array('screen_name' => $idTwitter));
    }
} else {
    $response = array('error' => true);
}
echo json_encode($response);
?>