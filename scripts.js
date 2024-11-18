// Users data
const users = [
    { name: "Alice", group: "cp club", codechef: 1500, codeforces: 1200, atcoder: 800, leetcode: 2000 },
    { name: "Bob",group: "cp club", codechef: 2000, codeforces: 1800, atcoder: 1600, leetcode: 2500 },
    { name: "Charlie",group: "cp club", codechef: 2500, codeforces: 2200, atcoder: 2000, leetcode: 3000 },
    { name: "David",group: "cp club", codechef: 1800, codeforces: 8000, atcoder: 1400, leetcode: 2200 },
    { name: "Eve",group: "cp club", codechef: 3000, codeforces: 2800, atcoder: 2400, leetcode: 3500 },
];

// Function to get rating color based on value
function getRatingColor(rating) {
    if (rating < 1200) return "gray";
    if (rating < 1400) return "green";
    if (rating < 1600) return "blue";
    if (rating < 1900) return "yellow";
    if (rating < 2100) return "red";
    return "purple";
}

// Function to calculate the average rating
function calculateAverage(user) {
    return (user.codechef + user.codeforces + user.atcoder + user.leetcode) / 4;
}

// Function to populate the leaderboard
function populateLeaderboard(sortBy = 'average') {
    const tbody = document.getElementById("leaderboardBody");

    // Calculate average for each user
    if (sortBy === 'average') {
        users.forEach(user => {
            user.average = calculateAverage(user);
        });
    }

    // Sort users by the selected column in descending order
    users.sort((a, b) => b[sortBy] - a[sortBy]);

    tbody.innerHTML = ''; // Clear existing rows

    // Populate leaderboard with sorted data
    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.group}</td>
            <td><span class="rating ${getRatingColor(user.codechef)}">${user.codechef}</span></td>
            <td><span class="rating ${getRatingColor(user.codeforces)}">${user.codeforces}</span></td>
            <td><span class="rating ${getRatingColor(user.atcoder)}">${user.atcoder}</span></td>
            <td><span class="rating ${getRatingColor(user.leetcode)}">${user.leetcode}</span></td>
            <td><span class="rating">${user.average.toFixed(2)}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Function to filter the leaderboard based on search input
function filterLeaderboard() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const tbody = document.getElementById("leaderboardBody");

    // Clear existing rows
    tbody.innerHTML = '';

    // Filter users based on the query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(query)
    );

    // Populate the table with filtered results
    filteredUsers.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.group}</td>
            <td><span class="rating ${getRatingColor(user.codechef)}">${user.codechef}</span></td>
            <td><span class="rating ${getRatingColor(user.codeforces)}">${user.codeforces}</span></td>
            <td><span class="rating ${getRatingColor(user.atcoder)}">${user.atcoder}</span></td>
            <td><span class="rating ${getRatingColor(user.leetcode)}">${user.leetcode}</span></td>
            <td><span class="rating">${calculateAverage(user).toFixed(2)}</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Add sorting functionality to the table headers
document.querySelectorAll('th').forEach(th => {
    th.addEventListener('click', () => {
        const column = th.getAttribute("data-column"); // Use data-column for matching
        if (column) {
            populateLeaderboard(column); // Sort by the clicked platform or average
        }
    });
});

// Fade in the container when the page loads
window.addEventListener("load", () => {
    document.querySelector(".container").style.opacity = "1";
    populateLeaderboard(); // Default sorting by average in decreasing order
});
