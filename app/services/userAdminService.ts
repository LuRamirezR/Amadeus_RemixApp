import { UserAdminInterface } from "../interfaces/userAdmin";

const USER_ADMIN_API =
  "https://66ad1390f009b9d5c7344ff5.mockapi.io/api/v1/user_admin";

// Metodo GET para obtener los usuarios administrativos - conexion al BackEnd (API)
export async function getUserAdmin(): Promise<
  UserAdminInterface[] | undefined
> {
  try {
    const userAdminResponse = await fetch(USER_ADMIN_API);
    if (!userAdminResponse.ok) {
      throw new Error("Error en la peticion GET de usuarios administrativos");
    }
    return await userAdminResponse.json();
  } catch (error) {
    console.error(
      "Error en la peticion GET de usuarios administrativos",
      error
    );
  }
}
