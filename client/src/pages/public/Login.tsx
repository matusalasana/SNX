import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios"
// Test 1: Let's see if importing these breaks it

export default function Login() {
  const navigate = useNavigate();
  const userd = async () => {
    const res = await axios.get("http://localhost:9000/api/v1/auth/me")
    return res.data
  };
  // Test 2: Let's see if calling these breaks it

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-900">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-xl font-bold mb-2">Testing Login Page</h1>
        <p>User exists: {userd.test}</p>
      </div>
    </div>
  );
}
