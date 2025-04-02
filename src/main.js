
import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Captura o evento de envio do formulário
document.getElementById("formulario").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const ideia = document.getElementById("ideia").value;
  const email = document.getElementById("contato").value;

  try {
    // Adicionando os dados no Firestore
    await addDoc(collection(db, "ideias"), {
      nome: nome,
      ideia: ideia,
      email: email,
      timestamp: serverTimestamp()
    });

    alert("Sua ideia foi enviada com sucesso!");
    document.getElementById("formulario").reset();
  } catch (error) {
    console.error("Erro ao enviar: ", error);
    alert("Erro ao enviar. Tente novamente.");
  }
});