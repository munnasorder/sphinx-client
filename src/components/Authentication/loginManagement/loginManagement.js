import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../../../firebase.config"

// initial firebase config
export const loginInitialMethod = () => {
    if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

// signup with email and password method
export const signUpWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result) => {
    handleUserName(name);
    return true;
  })
  .catch((error) => {
    // var errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage;
  });

    
};

// login with email and password method
export const loginWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result) => {
    // Signed in
    // var user = userCredential.user;
    const { displayName, email, photoURL } = result.user;
    const userInfo = { displayName, email, photoURL };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;

  })
  .catch((error) => {
    // var errorCode = error.code;
    const errorMessage = error.message;
    return errorMessage;
  });
};

// login google account method
export const loginWithGooglePopup = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  .then((result) => {
    // var credential = result.credential;

    // // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential.accessToken;
    // // The signed-in user info.
    // var user = result.user;
    const { displayName, email, photoURL } = result.user;
    const userInfo = { displayName, email, photoURL };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
  }).catch((error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    return errorMessage;
  });
};

// login facebook account method
export const loginWithFacebookPopup = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  .then((result) => {
    // /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;

    // // The signed-in user info.
    // var user = result.user;

    // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // var accessToken = credential.accessToken;
    const { displayName, email, photoURL } = result.user;
    const userInfo = { displayName, email, photoURL };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
    
  })
  .catch((error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    return errorMessage;
  });
};

// set user name
const handleUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
    displayName: name,
    }).then(function() {
    // Update successful.
    }).catch(function(error) {
    // An error happened.
    });
};

// sign out method
export const signOut = () => {
  firebase.auth().signOut().then(() => {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('jwtToken')
      window.location.reload();
    }).catch((error) => {
      // An error happened.
    });
}

export const getJwtToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  .then(function(idToken) {
    localStorage.setItem('jwtToken', idToken)
  }).catch(function(error) {
    // Handle error
  });
}