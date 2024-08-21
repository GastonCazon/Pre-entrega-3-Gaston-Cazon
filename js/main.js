// Función que calcula la cuota mensual de un préstamo
function calcularCuota({ capital, tasaInteresAnual, plazoEnAnios }) {
  const tasaInteresMensual = tasaInteresAnual / 100 / 12;
  const numeroDePagos = plazoEnAnios * 12;
  const x = Math.pow(1 + tasaInteresMensual, numeroDePagos);
  return (capital * x * tasaInteresMensual) / (x - 1);
}

// Función para validar los datos del préstamo
function esPréstamoVálido({ capital, tasaInteresAnual, plazoEnAnios }) {
  return capital > 0 && tasaInteresAnual > 0 && plazoEnAnios > 0;
}

// Manejo de eventos del DOM
document
  .getElementById("simulador-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Recoger datos del formulario
    const capital = parseFloat(document.getElementById("capital").value);
    const tasaInteresAnual = parseFloat(document.getElementById("tasa").value);
    const plazoEnAnios = parseInt(document.getElementById("plazo").value, 10);

    const prestamo = { capital, tasaInteresAnual, plazoEnAnios };

    // Validar datos
    if (esPréstamoVálido(prestamo)) {
      // Calcular cuota mensual
      prestamo.cuotaMensual = calcularCuota(prestamo);

      // Mostrar resultado en la página
      document.getElementById("detalleResultado").textContent = `
            Monto del préstamo: $${prestamo.capital}
            Tasa de interés anual: ${prestamo.tasaInteresAnual}%
            Plazo del préstamo: ${prestamo.plazoEnAnios} años
            Pago mensual: $${prestamo.cuotaMensual.toFixed(2)}
        `;

      // Guardar simulación en localStorage
      guardarSimulacion(prestamo);
    } else {
      alert("Por favor, ingrese valores válidos.");
    }
  });

// Función para guardar simulación en localStorage
function guardarSimulacion(prestamo) {
  let simulaciones = JSON.parse(localStorage.getItem("simulaciones")) || [];
  simulaciones.push(prestamo);
  localStorage.setItem("simulaciones", JSON.stringify(simulaciones));
}

// Mostrar simulaciones guardadas
document
  .getElementById("verSimulaciones")
  .addEventListener("click", function () {
    let simulaciones = JSON.parse(localStorage.getItem("simulaciones")) || [];
    const listaSimulaciones = document.getElementById("listaSimulaciones");
    listaSimulaciones.innerHTML = ""; // Limpiar contenido previo

    simulaciones.forEach((p, index) => {
      const simulacionDiv = document.createElement("div");
      simulacionDiv.innerHTML = `
            <h3>Simulación ${index + 1}</h3>
            <p>Monto del préstamo: $${p.capital}</p>
            <p>Tasa de interés anual: ${p.tasaInteresAnual}%</p>
            <p>Plazo del préstamo: ${p.plazoEnAnios} años</p>
            <p>Pago mensual: $${p.cuotaMensual.toFixed(2)}</p>
        `;
      listaSimulaciones.appendChild(simulacionDiv);
    });
  });

// Operadores avanzados: Destructuring y spread
// Aquí se usa destructuring en el cálculo de la cuota y spread para crear un nuevo objeto prestamo con propiedades adicionales
function ejemploOperadoresAvanzados() {
  const prestamoBase = { capital: 10000, tasaInteresAnual: 5, plazoEnAnios: 5 };
  const nuevoPrestamo = { ...prestamoBase, tasaInteresAnual: 4.5 }; // Sobreescribe la tasa de interés
  console.log(nuevoPrestamo); // { capital: 10000, tasaInteresAnual: 4.5, plazoEnAnios: 5 }
}

ejemploOperadoresAvanzados();
