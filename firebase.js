

const firebaseConfig = {
  apiKey: "AIzaSyBLD8AMhdP5JWDREXYvLL6UjsDYp6IlgUU",
  authDomain: "chat-31ec1.firebaseapp.com",
  databaseURL: "https://chat-31ec1-default-rtdb.firebaseio.com",
  projectId: "chat-31ec1",
  storageBucket: "chat-31ec1.appspot.com",
  messagingSenderId: "48002190365",
  appId: "1:48002190365:web:96e5093f48b4b17fdb4af4",
  measurementId: "G-QF7PYTEKEF"
};

firebase.initializeApp(firebaseConfig);

function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateFirebaseItem(ID, value) {
  return {
    userid: ID,
    data: value,
  };
}

function addElementInFirebase(REF, data) {
  firebase
    .database()
    .ref(REF + randomID())
    .set(data);
}

function getArrayFromFirebase(REF) {
  let tempArray = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        tempArray.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return tempArray;
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(`${REF}`).remove();
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function getElementFromFirebaseByID(REF, id) {
  const tempArray = getArrayFromFirebase(REF);
  let temp = {};
  tempArray.forEach((element) => {
    if (element.userid === id) {
      temp = element;
    }
  });
  return temp;
}

function changeDataOnFirebaseByID(REF, ID, data) {
  firebase
    .database()
    .ref(REF + "/" + ID)
    .set(data);
}
