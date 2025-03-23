import { ActionFunction, redirect } from "@remix-run/node";
import { UserInterface } from "../interfaces/user";
import { createUserRegistered } from "../services/userService";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import "./styles/register.css";

//Funcion para enviar los datos al backend
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const newUser: UserInterface = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
  };

  // Crea el usuario y recibe el ID generado
  const createdUser: UserInterface | undefined = await createUserRegistered(
    newUser
  );

  if (createdUser?.id) {
    return createdUser;
  }
  // Si no se crea el usuario, devuelve un error
  return redirect("/error"); // En caso de error
};

export default function RegisterUser() {
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const actionData = useActionData<UserInterface>(); // Para acceder a los datos del usuario creado

  // Determina que el correo sea valido
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Determina si el botón debe estar habilitado
  const isButtonDisabled = () =>
    !(nameUser && emailUser && isValidEmail(emailUser) && accepted);

  // Guarda datos en localStorage
  const handleLocalStorage = (
    userId: string,
    fullName: string,
    email: string
  ) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    //return redirect("/cards");
  };

  // Guarda en localStorage cuando los datos están disponibles
  useEffect(() => {
    if (actionData && actionData.id) {
      handleLocalStorage(
        actionData.id.toString(),
        actionData.full_name,
        actionData.email
      );
      navigate("/cards");
    }
  }, [actionData, navigate]);

  return (
    <section className="register">
      <div className="register-container">
        <Form method="post">
          <input
            type="text"
            name="full_name"
            placeholder="Nombre..."
            value={nameUser}
            onChange={(e) => setNameUser(e.target.value)}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
            required
          />
          <label htmlFor="accept-terms">
            <input
              type="checkbox"
              id="accept-terms"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            Acepto los términos y condiciones
          </label>
          <button type="submit" disabled={isButtonDisabled()}>
            Registrate
          </button>
        </Form>
      </div>
    </section>
  );
}
