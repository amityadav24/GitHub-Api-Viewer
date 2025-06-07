async function getProfile() {
  const username = document.getElementById('username').value.trim();
  const profilediv = document.getElementById('profile');
  const loader = document.getElementById('loader');

  profilediv.innerHTML = "";
  loader.style.display = 'block';

  if (!username) {
    loader.style.display = 'none';
    profilediv.innerHTML = '<p>Please enter a GitHub username.</p>';
    return;
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("User not found");
    const userData = await userRes.json();

    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    const repos = await repoRes.json();

    const repoList = repos.map(repo => `
      <li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>
    `).join("");

    profilediv.innerHTML = `
      <div class="profile-card">
        <img src="${userData.avatar_url}" alt="Avatar" />
        <h2>${userData.name || "No Name"}</h2>
        <p><strong>Username:</strong> ${userData.login}</p>
        <p><strong>Bio:</strong> ${userData.bio || "No bio"}</p>
        <p><strong>Location:</strong> ${userData.location || "N/A"}</p>
        <p><strong>Followers:</strong> ${userData.followers} | <strong>Following:</strong> ${userData.following}</p>
        <p><strong>Repos:</strong> ${userData.public_repos}</p>
        <p><strong>Website:</strong> <a href="${userData.blog}" target="_blank">${userData.blog}</a></p>
        <p><strong>GitHub:</strong> <a href="${userData.html_url}" target="_blank">${userData.html_url}</a></p>
        <h3>Recent Repositories:</h3>
        <ul>${repoList}</ul>
      </div>
    `;
  } catch (error) {
    profilediv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
  } finally {
    loader.style.display = 'none';
  }
}

// Theme Toggle
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}
