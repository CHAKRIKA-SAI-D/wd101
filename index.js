const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const dobInput = document.getElementById('dob');
const acceptTermsInput = document.getElementById('acceptTerms');

function isValidDOB(dob) {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

function addUserToTable(user) {
    const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).textContent = user.name;
    newRow.insertCell(1).textContent = user.email;
    newRow.insertCell(2).textContent = user.password;
    newRow.insertCell(3).textContent = user.dob;
    newRow.insertCell(4).textContent = user.acceptedTerms ? "true" : "false";
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (isValidDOB(dobInput.value)) {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            dob: dobInput.value,
            acceptedTerms: acceptTermsInput.checked
        };

        // Store user in localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Add the new user to the table immediately
        addUserToTable(newUser);

        // Clear the form fields
        form.reset();
    } else {
        alert('Age must be between 18 and 55');
    }
});

// Load users from localStorage and display them in the table on page load
window.onload = function () {
    //localStorage.clear();//clear for 1st visit

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addUserToTable(user));
};
