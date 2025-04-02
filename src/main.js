
import { db } from "./firebaseConfig.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const formulario = document.getElementById("formulario");
const erroMsg = document.getElementById("erro-msg");

formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const ideia = document.getElementById("ideia").value.trim();
  const email = document.getElementById("contato").value.trim();

  // Validação básica
  if (nome.length < 3) {
    mostrarErro("O nome deve ter pelo menos 3 caracteres.");
    return;
  }
  
  if (ideia.length < 10) {
    mostrarErro("A ideia deve ter pelo menos 30 caracteres.");
    return;
  }

  if (!validarEmail(email)) {
    mostrarErro("Por favor, insira um e-mail válido.");
    return;
  }

  try {
    // Adicionando os dados no Firestore
    await addDoc(collection(db, "ideias"), {
      nome,
      ideia,
      email,
      timestamp: serverTimestamp()
    });

    alert("Sua ideia foi enviada com sucesso!");
    formulario.reset();
    erroMsg.style.display = "none"; // Oculta mensagem de erro se tudo der certo
  } catch (error) {
    console.error("Erro ao enviar: ", error);
    mostrarErro("Erro ao enviar. Tente novamente.");
  }
});

// Função para validar e-mail
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Função para exibir mensagens de erro
function mostrarErro(mensagem) {
  erroMsg.textContent = mensagem;
  erroMsg.style.display = "block";
}