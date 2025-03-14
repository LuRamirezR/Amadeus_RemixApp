import AvatarSelector from "../components/avatar/avatar-selector";
import LoginForm from "../components/login-form/login-form";
import "./styles/login.css";

export default function Login() {
  return (
    <div className="login">
      <AvatarSelector />
      <div className="login-container">
        <h1 className="login-title">Login Section</h1>
        <LoginForm />
      </div>
    </div>
  );
}
