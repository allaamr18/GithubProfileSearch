const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function() {
    const username = searchInput.value;
    if (username === "") {
    document.getElementById("error-message").textContent = "Please enter a username";
    return;
}

   fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (response.status === 404) {
    document.getElementById("error-message").textContent = "User not found";
    throw new Error("User not found");
}

if (response.status === 403) {
    document.getElementById("error-message").textContent = "Too many requests. Try again later.";
    throw new Error("Rate limit exceeded");
}
        return response.json();
    })
        .then(data => {
            document.getElementById("error-message").textContent = "";

            document.getElementById("profile-name").textContent = data.name;
            document.getElementById("profile-image").src = data.avatar_url;
            document.getElementById("username").textContent = "Username: " + data.login;
            document.getElementById("bio").textContent = data.bio;
            document.getElementById("followers").textContent = "Followers: " + data.followers;
            document.getElementById("following").textContent = "Following: " + data.following;
        });

        fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc&per_page=5`)
    .then(response => response.json())
    .then(repos => {
        


    const repoList = document.getElementById("repositories");
    repoList.innerHTML = "";

    repos.forEach(repo => {
       const repoName = document.createElement("a");
        repoName.textContent = repo.name;
        repoName.href = repo.html_url;
        repoName.target = "_blank";
        repoList.appendChild(repoName);
    });
});
    });

    searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});


