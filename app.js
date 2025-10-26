// app.js
const CLIENT_ID = "235777072381-0rosmr2j2mif83l908iq170qpu30hb3j.apps.googleusercontent.com"; // ← your client ID
const QUIZ_URL = "https://sidd2213.github.io/login"; // ← your Google Sites quiz URL

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(decoded)));
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
}

function redirectToQuiz(user) {
  // Optionally append name/email as query parameters
  const params = new URLSearchParams({
    name: user.name,
    email: user.email,
  });
  window.location.href = `${QUIZ_URL}?${params.toString()}`;
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: (response) => {
      const user = decodeJwt(response.credential);
      if (user) {
        redirectToQuiz(user);
      } else {
        alert("Failed to verify login. Please try again.");
      }
    },
  });

  google.accounts.id.renderButton(
    document.getElementById("button-container"),
    { theme: "outline", size: "large" }
  );
};

document.getElementById("emailLoginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Simple demo check (replace with real authentication)
  if(email === "test@example.com" && password === "123456") {
    alert("Email login successful!");
    authSection.classList.add("hidden");
    profileSection.classList.remove("hidden");
    // Optionally show quiz here
  } else {
    alert("Invalid email or password!");
  }
});

