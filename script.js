window.alert('Welcome to my Portfolio Website')

let changetext = document.getElementById('textonclick');

function myFunction(){
   changetext.innerHTML = 'You can reach out through the message section. Be sure we will get back to you' 
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var confirmEmail = document.getElementById("confirmEmail").value;
        var password = document.getElementById("password").value;

        var nameRegex = /^[A-Za-z]{8,10}$/;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(name)) {
            showMessage("Name must be 8-10 characters long and contain only letters.");
            return;
        }

        if (!emailRegex.test(email)) {
            showMessage("Invalid email format.");
            return;
        }

        if (email !== confirmEmail) {
            showMessage("Emails do not match.");
            return;
        }

        if (password.length < 8) {
            showMessage("Password must be at least 8 characters long.");
            return;
        }

        // If all validations pass, submit the form
        showMessage("Form submitted successfully!", false);
    });

    function showMessage(message, isError = true) {
        var messageElement = document.getElementById("message");
        messageElement.textContent = message;
        messageElement.style.color = isError ? "red" : "green";
    }
});

