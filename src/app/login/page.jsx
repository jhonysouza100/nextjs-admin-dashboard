import styles from "@/components/login/login.module.css";
import LoginFormComponent from "@/components/login/loginForm/loginForm";

function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginFormComponent />
    </div>
  );
}

export default LoginPage;