// Function to check if the DOB is between 18 and 55 years
function isValidDOB(dob) {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
}

// Function to display saved data from localStorage
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.querySelector('#userTable tbody');
    userTableBody.innerHTML = ''; // Clear previous rows
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptedTerms ? 'Yes' : 'No'}</td>
        `;
        userTableBody.appendChild(row);
    });
}

// Event listener for form submission
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('acceptTerms').checked;

    // Validate the Date of Birth
    if (!isValidDOB(dob)) {
        alert('Date of birth must be for people between 18 and 55 years old.');
        return;
    }

    const newUser = {
        name,
        email,
        password,
        dob,
        acceptedTerms
    };

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Reload users in the table
    loadUsers();

    // Clear the form
    document.getElementById('registrationForm').reset();
});

// Load users when the page loads
window.addEventListener('load', loadUsers);
