let allUsers = [];

const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const citySelect = document.getElementById("city");

// Fetch users
async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
}

// Display users
function displayUsers(users) {
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>📧 ${user.email}</p>
            <p>🏢 ${user.company.name}</p>
            <p>📍 ${user.address.city}</p>
        </div>
    `).join("");
}

// Filter, search and sort
function updateUsers() {
    let users = [...allUsers];

    // Search
    const query = searchInput.value.toLowerCase();

    users = users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    // City Filter
    if (citySelect.value !== "") {
        users = users.filter(user => user.address.city === citySelect.value);
    }

    // Sort
    if (sortSelect.value === "az") {
        users.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortSelect.value === "za") {
        users.sort((a, b) => b.name.localeCompare(a.name));
    }

    displayUsers(users);
}

// Initialize
async function init() {

    allUsers = await fetchUsers();

    displayUsers(allUsers);

    // Add cities
    const cities = [...new Set(allUsers.map(user => user.address.city))];

    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    searchInput.addEventListener("input", updateUsers);
    sortSelect.addEventListener("change", updateUsers);
    citySelect.addEventListener("change", updateUsers);
}

init();