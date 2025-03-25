import { UserInterface } from "../interfaces/user";

const USER_API = "http://localhost:5174/api/user";
// const USER_API = "https://66ad1390f009b9d5c7344ff5.mockapi.io/api/v1/user";

//Metodo GET para optener los usuarios a la tabla user - conexion al BackEnd (API)
export async function getUserRegistered() {
  try {
    const userResponse = await fetch(USER_API);
    if (!userResponse.ok) {
      throw new Error("Error en la peticion GET de usuarios");
    }
    return await userResponse.json();
  } catch (error) {
    console.error("Error en la peticion GET de usuarios", error);
  }
}

//Metodo POST para crea un usuario y devuelve el objeto creado - conexion al BackEnd (API)
export async function createUserRegistered(
  user: UserInterface
): Promise<UserInterface | undefined> {
  try {
    const userResponse = await fetch(USER_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!userResponse.ok) {
      throw new Error("Error en la peticion POST de usuarios");
    }
    // Retorna el usuario creado
    return await userResponse.json();
  } catch (error) {
    console.log("Error en la peticion POST de usuarios", error);
  }
}
