//exercise 1 synchronous vs asynchronous

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

setTimeout(() => {
    console.log("D");
}, 100);

console.log("E");

// Output:
// A
// C
// E
// B
// D


// Exercise 2: Callback Pattern

function loadUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "Joseph",
            age: 20
        };

        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("User loaded:", user);
});


//Task 11.2
//exercise 1: experience callback hell

function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "John" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "Post 1" },
            { id: 2, title: "Post 2" }
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Thanks for sharing" }
        ]);
    }, 1000);
}

getUserData(1, function(user) {
    console.log("User:", user);

    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);

        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});

//exercise 2: promises

function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "John" });
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

function getPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Great post!" },
                { id: 2, text: "Thanks for sharing" }
            ]);
        }, 1000);
    });
}

getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.log("Error:", error);
    });