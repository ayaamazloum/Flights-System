const loginContainer = document.getElementById("loginContainer");
const signupContainer = document.getElementById("signupContainer");
const signupToLogin = document.getElementById("signupToLogin");
const loginToSignup = document.getElementById("loginToSignup");

const signupBtn = document.getElementById("signupBtn");
const formName = document.getElementById("formName");
const formEmail = document.getElementById("formEmail");
const formPassword = document.getElementById("formPassword");
const formDate = document.getElementById("formDate");
const formGender = document.getElementById("formGender");
const formPhone = document.getElementById("formPhone");
const unfilled = document.getElementById("unfilled");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const loginBtn = document.getElementById("loginBtn");

function toggleContainers() {
  loginToSignup.addEventListener("click", () => {
    loginContainer.classList.add("hidden");
    signupContainer.classList.remove("hidden");
  });
  signupToLogin.addEventListener("click", function () {
    loginContainer.classList.remove("hidden");
    signupContainer.classList.add("hidden");
    unfilled.classList.add("hidden");
  });
}
toggleContainers();

function signup() {
  signupBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const name = formName.value;
      const email = formEmail.value;
      const password = formPassword.value;
      const phonenumber = formPhone.value;
      const gender = formGender.value;
      const birthdate = formDate.value;

      if (
        !name ||
        !email ||
        !password ||
        !phonenumber ||
        !gender ||
        !birthdate
      ) {
        unfilled.classList.remove("hidden");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone_number", phonenumber);
      formData.append("gender", gender);
      formData.append("birth_date", birthdate);
      const response = await axios.post(
        "http://localhost/flights-system-website/backend/signup.php",
        formData
      );

      console.log(response.data);
      if (response.data.status === "success") {
        localStorage.setItem("loggedUser", response.data.user_id);
        window.location.href = "../index.html";
      } else {
        unfilled.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error", error);
    }
  });
}
signup();

function login() {
  loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      const email = loginEmail.value;
      const password = loginPassword.value;
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await axios.post(
        "http://localhost/flights-system-website/backend/login.php",
        formData
      );
      console.log(response.data);
      if (response.data.status === "logged in") {
        const isAdmin = response.data.isAdmin;
        if (isAdmin) {
          console.log("user is admin");
            localStorage.setItem("isAdmin", true);
            console.log("redirecting");
            window.location.href = "../pages/admin.html";
        } else {
          console.log("not admin");
          localStorage.setItem("loggedUser", response.data.user_id);
          window.location.href = "../index.html";
        }
      } else {
        console.log(response.data.status);
      }
    } catch (error) {
      console.error("Error", error);
    }
  });
}

login();
