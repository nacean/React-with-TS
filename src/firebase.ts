// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebaseConfig } from "./.env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = getFirestore(app);

// 필요한 곳에서 사용할 수 있도록 내보내기
const firebase = { db, collection, getDocs, getDoc, addDoc, deleteDoc, doc };

export default firebase;
