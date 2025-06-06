# Campus Virtual Urquiza - Foro Académico

Este proyecto es parte de la materia Práctica Profesionalizante I (2025) del Instituto J.J. de Urquiza.  
Tiene como objetivo crear un "foro académico institucional", como módulo central de una plataforma educativa propia.

---

## Tecnologías utilizadas

- **Frontend:** [Next.js](https://nextjs.org/) + [TailwindCSS](https://tailwindcss.com/)
- **Backend:** [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Base de datos:** [MongoDB](https://www.mongodb.com/)
- **Control de versiones:** Git + GitHub

---

## Funcionalidades previstas

- Registro e inicio de sesión con roles (Alumno, Profesor, Administración, Directivos)
- Creación y respuesta de temas en el foro
- Búsqueda y filtrado por carrera o categoría
- Notificaciones y sistema de marcadores
- Vistas personalizadas por carrera (colores: Verde, Azul, Rojo)
- Panel de administración para moderar contenido y gestionar categorías

---

## Estructura del proyecto

campus-virtual-urquiza/
├── client/ → Frontend en Next.js
├── server/ → Backend con Express y MongoDB
├── .gitignore
├── README.md

## Instalación y ejecución

### 1. Clonar el repositorio

git clone https://github.com/IanFeugeas/campus-virtual-urquiza.git
cd campus-virtual-urquiza

### 2. Configurar variables de entorno

Crear el archivo .env en la carpeta /server basado en .env.example:

PORT=5000
MONGO_URI= tu_cadena_de_conexion_mongodb
JWT_SECRET= ********

### 3. Instalar dependencias

Frontend (Next.js)

cd client
npm install
npm run dev

Backend (Express)

cd ../server
npm install
node index.js

### Contribuciones

Para trabajar en equipo, seguimos el flujo de ramas:

Crear rama: git checkout -b feature/nombre-de-la-funcionalidad

Subir cambios: git push origin feature/nombre-de-la-funcionalidad

Merge a dev cuando esté aprobado

📚 Licencia
MIT © 2025 - Proyecto académico
