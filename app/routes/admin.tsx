import { useEffect, useState } from "react";
import { getUserAdmin } from "~/services/userAdminService";
import { UserAdminInterface } from "~/interfaces/userAdmin";
import { Form } from "@remix-run/react";
import SocialMedia from "~/components/social-media/social-media";
import "./styles/admin.css";

export default function AdminUsers() {
  const [adminUsers, setAdminUsers] = useState<UserAdminInterface[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonDisabled = () => !(username && password);

  useEffect(() => {
    async function fetchAdminUsers() {
      const users = await getUserAdmin();
      if (users) {
        setAdminUsers(users);
      }
    }
    fetchAdminUsers();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const user = adminUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      // Redirect to another view or perform any action
      console.log("Login successful");
      // Example: navigate("/reports");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <section className="admin-users">
      <div className="admin-users-header">
        <h1>Usuario Administrativo</h1>
      </div>
      <div className="admin-users-container">
        <Form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="admin-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-input"
          />
          <button
            type="submit"
            disabled={isButtonDisabled()}
            className="admin-submit-button"
          >
            Login
          </button>
        </Form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <SocialMedia backgroundColor="#000835" iconColor="#0c66e1" />
    </section>
  );
}
