document.addEventListener("DOMContentLoaded", function () {
  const themeToggleButton = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const clickSound = document.getElementById("click-sound");
  const chatArea = document.getElementById("chat-area");
  const currentRoleDisplay = document.getElementById("current-role");
  const sendButton = document.getElementById("send-button");
  const messageInput = document.getElementById("message-input");

  // Load saved theme and role from local storage
  let savedTheme = localStorage.getItem("theme") || "light";
  let savedRole = localStorage.getItem("role") || "None";
  setTheme(savedTheme);
  currentRoleDisplay.textContent = savedRole;

  // API Token and Endpoint
  const accessToken = "Ptjc30Ig1CiRECzXdvjq9kNXeDTHzN"; // Your Freelancer Access Token
  const freelancerApiUrl = "https://www.freelancer.com/api/users/0.1/"; // Replace with the correct API endpoint

  // Function to fetch freelancer data from the API
  async function fetchFreelancerData() {
    try {
      const response = await fetch(freelancerApiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Freelancer data");
      }

      const data = await response.json();
      displayFreelancerData(data);
    } catch (error) {
      console.error("Error fetching Freelancer data:", error);
    }
  }

  // Display Freelancer data
  function displayFreelancerData(data) {
    const userInfoDiv = document.getElementById("user-info");
    if (data && data.username) {
      userInfoDiv.innerHTML = `
          <p><strong>Username:</strong> ${data.username}</p>
          <p><strong>Email:</strong> ${data.email || "N/A"}</p>
          <p><strong>Profile:</strong> <a href="${
            data.profile_url
          }" target="_blank">View Profile</a></p>
        `;
    } else {
      userInfoDiv.innerHTML = "<p>No freelancer data available</p>";
    }
  }

  // Fetch Freelancer data on page load
  fetchFreelancerData();

  // Theme Toggle Function
  themeToggleButton.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    setTheme(newTheme);
    clickSound.play();
  });

  // Function to handle the theme change
  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      themeIcon.src ="img/5235480252841585608.jpg"; // Dark mode icon
    } else {
      document.body.classList.remove("dark-theme");
      themeIcon.src = "img/5235480252841585607.jpg"; // Light mode icon
    }
    localStorage.setItem("theme", theme);
  }

  // Send message when clicking the button or pressing "Enter"
  sendButton.addEventListener("click", sendMessage);
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const messageText = messageInput.value.trim();
    const role = currentRoleDisplay.textContent;
    if (messageText === "") return;

    const messageDiv = document.createElement("div");
    messageDiv.className = "message message-right";
    messageDiv.innerHTML = `<p><span class="message-role">${role}:</span> <strong>You:</strong> ${messageText}</p>`;
    chatArea.appendChild(messageDiv);
    messageInput.value = "";
    chatArea.scrollTop = chatArea.scrollHeight;
  }

  // Set Role
  function setRole(role) {
    currentRoleDisplay.textContent = role;
    localStorage.setItem("role", role);
  }
  window.setRole = setRole;

  // Show Current Time
  document
    .getElementById("show-time-button")
    .addEventListener("click", function () {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      document.getElementById(
        "current-time"
      ).textContent = `Current Time: ${timeString}`;
    });

  // Search Users
  function searchUsers() {
    const searchValue = document
      .getElementById("search-bar")
      .value.toLowerCase();
    const users = document.querySelectorAll(".user-item");
    users.forEach((user) => {
      const userName = user.textContent.toLowerCase();
      user.style.display = userName.includes(searchValue) ? "" : "none";
    });
  }
  window.searchUsers = searchUsers;

  // Load Chat for a specific user
  function loadChat(userName) {
    chatArea.innerHTML = `<div class="message message-left"><p><strong>${userName}:</strong> Hello! This is a sample chat message from ${userName}.</p></div>`;
  }
  window.loadChat = loadChat;
});
