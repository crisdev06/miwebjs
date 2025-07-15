// Función para validar Nombre y Apellido: solo letras y espacios
function validarNombreApellido(valor) {
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return regex.test(valor.trim());
}

// Función para validar RUT: solo números y guion (-)
function validarRut(valor) {
  const regex = /^[0-9]+-?[0-9kK]$/;
  return regex.test(valor.trim());
}

// Función para validar Email con formato correcto
function validarEmail(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(valor.trim());
}

// Función para validar Teléfono: solo números
function validarTelefono(valor) {
  const regex = /^[0-9]+$/;
  return regex.test(valor.trim());
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");

  const campos = {
    nombre: {
      input: document.getElementById("nombre"),
      validar: validarNombreApellido,
      mensajeError: "Solo letras y espacios permitidos.",
    },
    apellido: {
      input: document.getElementById("apellido"),
      validar: validarNombreApellido,
      mensajeError: "Solo letras y espacios permitidos.",
    },
    rut: {
      input: document.getElementById("rut"),
      validar: validarRut,
      mensajeError: "Solo números y guion (-) permitidos.",
    },
    email: {
      input: document.getElementById("email"),
      validar: validarEmail,
      mensajeError: "Formato de correo inválido.",
    },
    telefono: {
      input: document.getElementById("telefono"),
      validar: validarTelefono,
      mensajeError: "Solo números permitidos.",
    },
  };

  // Función para validar un campo y mostrar mensaje/error visual
  function validarCampo(campo) {
    const valor = campo.input.value;
    const esValido = campo.validar(valor);
    const feedback = campo.input.nextElementSibling; // div.invalid-feedback

    if (valor === "") {
      campo.input.classList.remove("is-valid", "is-invalid");
      feedback.textContent = "";
      return false;
    }

    if (esValido) {
      campo.input.classList.add("is-valid");
      campo.input.classList.remove("is-invalid");
      feedback.textContent = "";
      return true;
    } else {
      campo.input.classList.add("is-invalid");
      campo.input.classList.remove("is-valid");
      feedback.textContent = campo.mensajeError;
      return false;
    }
  }

  // Agregar eventos 'input' para validar en tiempo real
  Object.values(campos).forEach((campo) => {
    campo.input.addEventListener("input", () => validarCampo(campo));
  });

  // Validar todo el formulario al enviarlo
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formularioValido = true;

    // Validar todos los campos al enviar
    Object.values(campos).forEach((campo) => {
      const valido = validarCampo(campo);
      if (!valido) formularioValido = false;
    });

    if (formularioValido) {
      alert("Formulario ingresado correctamente");
      form.reset();
      // Quitar clases de validación después de reset
      Object.values(campos).forEach((campo) => {
        campo.input.classList.remove("is-valid", "is-invalid");
        campo.input.nextElementSibling.textContent = "";
      });
    }
  });
});
