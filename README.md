# Proyecto Frontend Amadeus

Este es un proyecto desarrollado en **nodoEAFIT**, utilizando **React** con el framework **Remix** y **TypeScript**. El objetivo principal es crear una aplicación interactiva que permita a los usuarios identificar sus preferencias de viaje y, con base en sus respuestas, recomendarles destinos ideales en América y Europa.

## Descripción del Proyecto

La aplicación cuenta con las siguientes funcionalidades principales:

- **Juego de preguntas**: Los usuarios responden una serie de preguntas para identificar sus preferencias de viaje.
- **Recomendación de destinos**: Según las respuestas, se muestra el destino de viaje que mejor se ajusta a sus preferencias.
- **Vista de hoteles**: Los usuarios pueden explorar los hoteles disponibles en el destino recomendado.
- **Vista de gráficos**: Un usuario administrador tiene acceso a una sección de reportes donde puede visualizar el acumulado de todas las respuestas de los usuarios. Además, esta vista permite descargar los reportes en formato PDF.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
app/
├── components/       # Componentes modulares y reutilizables de la interfaz de usuario
├── interfaces/       # Definición de interfaces y tipos para tipado estático en TypeScript
├── routes/           # Páginas y rutas principales de la aplicación
│   ├── styles/       # Archivos de estilos específicos para cada ruta
├── services/         # Lógica de negocio y funciones para realizar peticiones a la API (Backend en C# .NET)
```

## Tecnologías Utilizadas

- **React** con el framework **Remix**
- **TypeScript**
- **CSS**
- **Backend**: API desarrollada en **C# .NET** [Repositorio](https://github.com/jonathanG29/API_AMADEUS_BACK)

## Equipo de Desarrollo

Este proyecto fue desarrollado de manera colaborativa por:

- [Santiago Bohorquez](https://github.com/SantiagoBA98)
- [Jonathan Gallego](https://github.com/jonathanG29)
- [Sebastian Perez](https://github.com/Sebaspj7)
- [Luisa Fda. Ramirez](https://github.com/LuRamirezR)

## Cómo Ejecutar el Proyecto

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener instalado **Node.js** y **npm**.
3. Instala las dependencias del proyecto ejecutando el siguiente comando en la terminal:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo con:

   ```bash
   npm run dev
   ```

5. Si deseas ejecutar la aplicación en modo producción:

   ```bash
   npm start
   ```

6. Asegúrate de desplegar los siguientes directorios generados tras ejecutar `npm run build`:

   - `build/server`
   - `build/client`

## Estilos

Este proyecto utiliza [Tailwind CSS](https://tailwindcss.com/) como framework de estilos. Puedes personalizar los estilos o usar cualquier otro framework CSS de tu preferencia. Consulta la [documentación de Vite sobre CSS](https://vitejs.dev/guide/features.html#css) para más información.
