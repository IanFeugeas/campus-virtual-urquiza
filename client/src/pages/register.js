import { useState } from "react";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carrera, setCarrera] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, carrera }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.mensaje || "Error en el registro");
        return;
      }

      setMensaje("✅ Registro exitoso. Espera aprobación del admin.");
      setNombre("");
      setEmail("");
      setPassword("");
      setCarrera("");
    } catch (error) {
      console.error(error);
      setMensaje("Error en el servidor");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1>Registro</h1>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email institucional"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={carrera} onChange={(e) => setCarrera(e.target.value)} required>
          <option value="">Seleccioná tu carrera</option>
          <option value="Desarrollo de Software">Desarrollo de Software</option>
          <option value="Analista Funcional">Analista Funcional</option>
          <option value="Infraestructura de Software">Infraestructura de Software</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}