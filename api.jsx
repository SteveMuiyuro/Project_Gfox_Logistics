// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   query,
//   where,
// } from "firebase/firestore/lite";

// const firebaseConfig = {
//   apiKey: "AIzaSyCXpHJYUEKuIx3TSkWb-Td_gJoKDzMLj8I",
//   authDomain: "gfox-logistics.firebaseapp.com",
//   projectId: "gfox-logistics",
//   storageBucket: "gfox-logistics.appspot.com",
//   messagingSenderId: "903811941434",
//   appId: "1:903811941434:web:72cfec35d7dd97d102e103",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const trucksCollection = collection(db, "trucks");

// export async function getTrucks() {
//   const snapshot = await getDocs(trucksCollection);
//   const trucks = snapshot.doc.map((doc) => ({ ...doc.data(), id: doc.id }));
//   return trucks;
// }

// export async function getTruck(id) {
//   const truckRef = doc(db, "trucks", id);
//   const snapshot = await getDoc(truckRef);
//   return {
//     ...snapshot.data(),
//     id: snapshot.id,
//   };
// }

// export async function getTrucks() {
//   const q = query(trucksCollection, where("hostId", "==", "123"));
//   const snapshot = await getDocs(q);
//   const trucks = snapshot.doc.map((doc) => ({ ...doc.data(), id: doc.id }));
//   return trucks;
// }

async function getTrucks() {
  const res = await fetch("api/trucks");
  if (!res.ok) {
    throw {
      message: "Failed to collect trucks",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.trucks;
}

async function fetchTruck() {
  const res = await fetch("/api/host/trucks");
  if (!res.ok) {
    throw {
      message: "Trucks not Found",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.trucks;
}

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}

export { getTrucks, fetchTruck };
