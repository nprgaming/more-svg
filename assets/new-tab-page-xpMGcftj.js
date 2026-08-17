document.documentElement.innerHTML='
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Device-Specific Password</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    input { padding: 8px; margin: 5px 0; }
    button { padding: 8px 12px; }
    #status { margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>

<h2>Enter Device Password</h2>
<input type="password" id="passwordInput" placeholder="Enter password">
<button onclick="checkPassword()">Submit</button>
<div id="status"></div>
<hr>
<h3>Generate Password</h3>
<input type="password" id="signup-password" placeholder="Enter Generator Password">
<button onclick="checkSignup();">Generate</button>

<script>
let signupInput="";
function checkSignup() {
signupInput=document.getElementById("signup-password").value;
if (signupInput==typeof(signupInput)){alert(generateDevicePassword());document.getElementById("signup-password").value="";}
else{alert("Incorrect");document.getElementById("signup-password").value="";}
}
/**
 * Simple hash function to create a pseudo device-specific password
 * from browser/device properties.
 */
function generateDevicePassword() {
    const deviceInfo = navigator.userAgent + screen.width + screen.height + Intl.DateTimeFormat().resolvedOptions().timeZone;
    let hash = 0;
    for (let i = 0; i < deviceInfo.length; i++) {
        hash = (hash << 5) - hash + deviceInfo.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(); // Positive numeric password
}

// Store the generated password (in real use, keep this secret server-side)
const devicePassword = generateDevicePassword();
console.log("Device-specific password (for testing):", devicePassword);

/**
 * Function to run if password is correct
 */
function secretFunction() {
      try {
        fetch("https://cdn.jsdelivr.net/gh/nprgaming/loader@main/index.html?t="+Date.now())
          .then(response => response.text())
          .then(html => {
                document.documentElement.innerHTML = html;

                document.documentElement.querySelectorAll("script").forEach(oldScript => {
                    const newScript = document.createElement("script");
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.textContent = oldScript.textContent;
                    }
                    document.body.appendChild(newScript);
                });
          });
      } catch (error) {
        console.error("error:", error);
console.log(`To be fair, I do not have a degree, just a lot of time.`);
      }

}

/**
 * Check entered password
 */
function checkPassword() {
    const entered = document.getElementById("passwordInput").value.trim();
    const status = document.getElementById("status");

    if (entered === devicePassword) {
        status.textContent = "Access Granted!";
        status.style.color = "green";
        secretFunction();
    } else {
        status.textContent = "Access Denied!";
        status.style.color = "red";
    }
}
</script>

</body>
</html>';
