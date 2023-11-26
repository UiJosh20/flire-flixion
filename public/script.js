

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCps2kwmDIoGpgqiH-RSpBc_UDdmuwLpg4",
  authDomain: "fireflixion.firebaseapp.com",
  projectId: "fireflixion",
  storageBucket: "fireflixion.appspot.com",
  messagingSenderId: "34680166639",
  appId: "1:34680166639:web:8f8a756f7e03c4df37a31a",
  measurementId: "G-1P4RSCX3L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerGIt = new GithubAuthProvider();

const googleSignin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (user) {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification email sent!");
        });
        window.location.href = "index.html";
      } else {
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      let errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "auth/account-exists-with-different-credential") {
        showerr.innerHTML = `<p style="color:red; text-align:center;">A user is already signed in with that email</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 3000);
      }else if(errorCode == "auth/internal-error") {
        showerr.innerHTML = `<p style="color:orange; text-align:center;">you are not connected to the internet</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 3000);
      }
    });
};
window.googleSignin = googleSignin;

const signInGit = () => {
  signInWithPopup(auth, providerGIt)
    .then((result) => {
      const user = result.user;
      if (user) {
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification email sent!");
        });
        window.location.href = "index.html";
      } else {
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      let errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "auth/account-exists-with-different-credential") {
        showerr.innerHTML = `<p style="color:red; text-align:center;">A user is already signed in with that email</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 4000);
      }else if(errorCode == "auth/internal-error") {
        showerr.innerHTML = `<p style="color:orange; text-align:center;">you are not connected to the internet</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 4000); 
      }
    });
};
window.signInGit = signInGit;

const signinEmail = () => {
  let email = yourEmail.value;
  let password = yourPass.value;
  yourEmail.value = "";
  yourPass.value = "";
  if (email == "" || password == "") {
    showerr.innerHTML = `<p style="color:red; text-align:center;">Email and password cannot be left empty</p>`;
    setTimeout(() => {
      showerr.style.display = "none";
    }, 4000);
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      let errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "auth/invalid-login-credentials") {
        showerr.innerHTML = `<p style="color:red; text-align:center;"> you have entered an invalid email and password</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
          
        }, 4000);
      }else if(errorCode == "auth/internal-error" || errorCode == "auth/network-request-failed") {
        showerr.innerHTML = `<p style="color:orange; text-align:center;">you are not connected to the internet</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 4000);
      }
    });
};

window.signinEmail = signinEmail;

const btnAll = () => {
  let email = yourOEmail.value;
  let password = yourOPass.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = "login.html";
    })
    .catch((error) => {
      let errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "auth/email-already-in-use") {
        showerr.innerHTML = `<p style="color:red; text-align:center;">This email already exists</p>`;
        setTimeout(() => {
          showerr.style.display = "none";
        }, 4000);
      } else {
        yourOEmail.value = "";
        yourOPass.value = "";
      }
    });
};

window.btnAll = btnAll;
