# 🐾 Portal Mascotas - Guía de Instalación

Este proyecto está dividido en **frontend (React)** y **backend (Flask)**.
Seguí estos pasos para clonar y correr el proyecto correctamente.

---

## ✅ Requisitos previos

Asegurate de tener instalado:

* [Git](https://git-scm.com/)
* [Node.js y npm](https://nodejs.org/) (para React)
* [Python 3](https://www.python.org/) (para Flask)
* [XAMPP](https://www.apachefriends.org/index.html) (para MySQL y phpMyAdmin)

---

## 🧠 Clonar el repositorio

```bash
git clone https://github.com/JesyGomez/PortalMascotas-PoloIT.git
cd portal-mascotas-polo-it
```

---

## 🚀 Configuración del Frontend (React)

```bash
cd frontend
npm install
npm start
```

> Esto levanta React en `http://localhost:3000`

---

## 🪩 Configuración del Backend (Flask)

```bash
cd backend
python -m venv venv
venv\Scripts\activate     # En Windows
# o
source venv/bin/activate  # En Mac/Linux
pip install flask flask-cors
```

> Para guardar dependencias:

```bash
pip freeze > requirements.txt
```

Luego:

```bash
python app.py
```

> Esto levanta el servidor Flask en `http://localhost:5000`

---

## 🛎️ Conexión entre Front y Back

Ya está configurada en el frontend:

```js
fetch('http://localhost:5000/login', { ... })
```

> Cuando se conecte a una base de datos real, se actualizará el backend para hacer la validación desde MySQL en lugar de datos hardcodeados.

---

## 🐘 Instalación de XAMPP y preparación de la base de datos

1. Descargar XAMPP desde [apachefriends.org](https://www.apachefriends.org/index.html) e instalarlo.

2. Abrir el panel de control de XAMPP y encender **Apache** y **MySQL**.

3. Ir a `http://localhost/phpmyadmin` desde el navegador.

4. Crear una nueva base de datos llamada `portal_mascotas`.

5. Crear una tabla llamada `usuarios` con las siguientes columnas como ejemplo:

   ```sql
   CREATE TABLE usuarios (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(100) NOT NULL,
     password VARCHAR(100) NOT NULL
   );
   ```

6. Insertar un usuario demo si querés testear desde el login:

   ```sql
   INSERT INTO usuarios (email, password) VALUES ('admin@admin.com', '1234');
   ```

7. Más adelante se agregará la conexión en Flask con `mysql.connector` o `SQLAlchemy`.

---

## 📂 Notas adicionales

* Si usamos variables de entorno, se incluirá un archivo `.env.example`
* Usuario demo (modo hardcodeado): `admin@admin.com` / `1234`

---

## 📃 Comandos útiles

| Acción                      | Comando                        |
| --------------------------- | ------------------------------ |
| Clonar repo                 | `git clone URL`                |
| Instalar dependencias React | `npm install`                  |
| Iniciar React               | `npm start`                    |
| Crear entorno Python        | `python -m venv venv`          |
| Activar entorno             | `venv\Scripts\activate` (Win)  |
| Instalar Flask              | `pip install flask flask-cors` |
| Iniciar Flask               | `python app.py`                |
| Iniciar XAMPP               | Desde el panel de control      |
| Abrir phpMyAdmin            | `http://localhost/phpmyadmin`  |

---

Listo, ya estás preparado para contribuir 🌟
