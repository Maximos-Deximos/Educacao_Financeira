function entrar() {
  if (estaAutenticado()) {
    window.location.href = 'pages/home.html';
  } else {
    window.location.href = 'pages/login.html';
  }
}

document.getElementById('entrar-btn').addEventListener('click', function (evento) {
  evento.preventDefault();
  entrar();
});