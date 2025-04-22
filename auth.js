// Authentication state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user.email);
    updateAuthUI(true);
  } else {
    // User is signed out
    console.log("User is signed out");
    updateAuthUI(false);
  }
});

// Update UI based on authentication state
function updateAuthUI(isSignedIn) {
  const loginLink = document.querySelector('a[href="login.html"]');
  const signupLink = document.querySelector('a[href="signup.html"]');
  const profileLink = document.querySelector('a[href="profile.html"]');
  const findTeammatesLink = document.querySelector(
    'a[href="find-teammates.html"]'
  );
  const messagesLink = document.querySelector('a[href="messages.html"]');
  const logoutButton = document.getElementById("logoutButton");

  if (isSignedIn) {
    if (loginLink) loginLink.style.display = "none";
    if (signupLink) signupLink.style.display = "none";
    if (profileLink) profileLink.style.display = "block";
    if (findTeammatesLink) findTeammatesLink.style.display = "block";
    if (messagesLink) messagesLink.style.display = "block";
    if (logoutButton) logoutButton.style.display = "block";
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (signupLink) signupLink.style.display = "block";
    if (profileLink) profileLink.style.display = "none";
    if (findTeammatesLink) findTeammatesLink.style.display = "none";
    if (messagesLink) messagesLink.style.display = "none";
    if (logoutButton) logoutButton.style.display = "none";
  }
}

// Sign up function
function signUp(email, password) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      throw error;
    });
}

// Sign in function
function signIn(email, password) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      throw error;
    });
}

// Sign out function
function signOut() {
  return auth
    .signOut()
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
      throw error;
    });
}

// Add event listener for logout button if it exists
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", signOut);
  }
});
