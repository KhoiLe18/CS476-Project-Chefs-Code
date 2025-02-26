
<?php
require_once("db.php");

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data); //encodes
    return $data;
}

$errors = array();
$email = "";
$password = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = test_input($_POST["email"]);
    $password = test_input($_POST["password"]);

    $passwordRegex = "/^.{6,}$/";
    $emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";

    if (!preg_match($emailRegex, $email)) {
        $errors["email"] = "Invalid Email Address";
    }
    if (!preg_match($passwordRegex, $password)) {
        $errors["password"] = "Invalid Password";
    }

    $target_file = "";

    try {
          $db = new PDO($attr, $db_user, $db_pwd, $options);
      } catch ( PDOException $e) {
          throw new PDOException($e->getMessage(), (int)$e->getCode());
      }

    $query = "SELECT id FROM users WHERE email = '$email'";
    $result = $db->query($query);
    $match = $result->fetch();

    if ($match) {
        $errors["Account Taken"] = "A user with that username already exists.";
    }
    if (empty($errors)) {

        $query = "INSERT INTO users (email, password) VALUES (:email, :password)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $password);
            $stmt->execute();

            $user_id = $db->lastInsertId();
        } 
        $db = null;
            
        if (empty($errors)) {
            header("Location: beforelogin.html");
            exit();
        }
    }
    if (!empty($errors)) {
        foreach($errors as $type => $message) {
            print("$type: $message \n<br />");
        }
    }


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chef's Code</title>
    <link rel="stylesheet" type="text/css" href="./css/signup.css" />
    <script src="js/eventHandler.js"></script>

</head>
<body>
    <div id="container-Signup">
        <header id="header-auth">
            <h1>Sign Up</h1>
        </header>

        <main id="main-center">
        <form id="signup" action="" method="post" class="auth-form"  enctype="multipart/form-data">
                <p class="input-field">
                <label for = "fname">First Name</label>
                <input type="text" placeholder="Enter first name" v-model="fname" />
                <p id="error-text-fname" class="error-text hidden">First name is invalid</p>
                </p>

                <p class="input-field">
                <label for = "lname">Last Name</label>
                <input type="text" placeholder="Enter last name" v-model="lname" />
                <p id="error-text-fname" class="error-text hidden">First name is invalid</p>
                </p>

                <p class="input-field">
                <label for="email">Email</label>
                <input type="email" v-model="email" placeholder="Enter email" />
                <p id="error-text-email" class="error-text <?= isset($errors['email'])?'':'hidden' ?>">Email is invalid</p>
                </p>

                <p class="input-field">
                <label>Password</label>
                <input type="password" v-model="password" placeholder="Enter password" />
                <p id="error-text-password" class="error-text <?= isset($errors['password'])?'':'hidden' ?>">Password is invalid</p>
                </p>

                <p class="input-field">
                <label for="cpassword">Confirm Password</label>
                <input type="password" v-model="cpassword" placeholder="Re-enter password" />
                <p id="error-text-cpassword" class="error-text hidden">Password and confirm password does not match</p>
                </p>
                <!-- Google reCAPTCHA -->
                <div class="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>

            <p class="input-field">
                <input type="submit" class="form-submit" value="Signup" />
            </p>
            </form>
            <div class="foot-note">
               <p>Already have an account? <a href="login.html">Login</a></p>
            </div>
        </main>
     
    </div>
</div>
    <script src="./js/eventSignup.js"></script>
</body>

</html>

