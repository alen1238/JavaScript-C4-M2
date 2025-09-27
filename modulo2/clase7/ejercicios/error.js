const err = new Error("Falta el parámetro 'nombre'");
err.statusCode = 400;         // Error del cliente
err.errorCode = "USR_001";   
err.nombreAlternativo = "Error de validación";


console.log(err.name);    // "Error"
console.log(err.message); // "Falta el parámetro 'nombre'"
console.log(err.stack);   // Traza completa con archivo y línea
console.log(err.statusCode); // 400
console.log(err.errorCode);  // "USR_001"
console.log(err.nombreAlternativo); // "Error de validación"