
// Importar Firebase (versión modular vía CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAewz-r6rwp7zk71UIHsTjwQSj1rmCgNWM",
  authDomain: "quimicartisur.firebaseapp.com",
  projectId: "quimicartisur",
  storageBucket: "quimicartisur.firebasestorage.app",
  messagingSenderId: "272529571760",
  appId: "1:272529571760:web:1f8d435e762e61a332e075",
  measurementId: "G-P0767HS3P8"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FUNCIONES DE ADMIN

export async function agregarProducto({ nombre, precio, imagen, link }) {
  try {
    await addDoc(collection(db, "productos"), {
      nombre,
      precio: Number(precio),
      imagen,
      link
    });
    alert("Producto agregado con éxito a Firebase ✅");
  } catch (e) {
    console.error("Error al guardar:", e);
    alert("Error al guardar producto ❌");
  }
}

export async function obtenerProductos() {
  const querySnapshot = await getDocs(collection(db, "productos"));
  const productos = [];
  querySnapshot.forEach((doc) => {
    productos.push({ id: doc.id, ...doc.data() });
  });
  return productos;
}
