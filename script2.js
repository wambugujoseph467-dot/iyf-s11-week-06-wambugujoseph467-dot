// Lesson 12 Tasks
// Task 12.1: Fetch API Basics

// Exercise 1: Your First Fetch

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => {
        console.log("Response object:", response);
        console.log("Status:", response.status);
        console.log("OK:", response.ok);
        return response.json();
    })
    .then(data => {
        console.log("User data:", data);
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });


// Exercise 2: Fetch with Async/Await

async function getUser(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Failed to fetch user:", error);
    }
}

// Call the function
getUser(1).then(user => {
    console.log("Async/Await User:", user);
});


// Practice 1: Fetch a Single User

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json())
    .then(user => {
        console.log("Single User:");
        console.log(user);
    })
    .catch(error => {
        console.error(error);
    });


// Practice 2: Fetch All Users

fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
        console.log("All Users:");
        console.log(users);
    })
    .catch(error => {
        console.error(error);
    });

// Practice 3: Fetch Posts for User 1

fetch("https://jsonplaceholder.typicode.com/users/1/posts")
    .then(response => response.json())
    .then(posts => {
        console.log("Posts for User 1:");
        console.log(posts);
    })
    .catch(error => {
        console.error(error);
    });