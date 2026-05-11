// ------------------------
// REGISTRATION PAGE LOGIC
// ------------------------

let registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Get values
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let mobile = document.getElementById("mobile").value;
        let course = document.getElementById("course").value;

        // Create object
        let userData = {
            name: name,
            email: email,
            mobile: mobile,
            course: course
        };

        // AJAX POST Request
        let xhr = new XMLHttpRequest();

        xhr.open(
            "POST",
            "https://jsonplaceholder.typicode.com/posts",
            true
        );

        xhr.setRequestHeader(
            "Content-Type",
            "application/json"
        );

        xhr.onload = function () {

            if (xhr.status == 201) {

                // Get old data
                let users =
                    JSON.parse(localStorage.getItem("users")) || [];

                // Push new data
                users.push(userData);

                // Store in local storage
                localStorage.setItem(
                    "users",
                    JSON.stringify(users)
                );

                alert("Registration Successful!");

                // Redirect
                window.location.href = "data.html";
            }
        };

        xhr.send(JSON.stringify(userData));

    });
}

// ------------------------
// DATA PAGE LOGIC
// ------------------------

let tableBody = document.getElementById("tableBody");

if (tableBody) {

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(function (user) {

        let row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td>${user.course}</td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}