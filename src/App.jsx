import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import "./i18n";

function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
