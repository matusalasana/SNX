import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../hooks/auth/useLogin";
import { useAuth } from "../../hooks/auth/useAuth";
import { loginSchema, type LoginFormData } from "../../schema/auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  useEffect(() => {
    if (user) {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  return (
    <main className="grid-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="card space-y-6 sm:p-8">
          {/* HEADER */}
          <div className="text-center">
            <h1 className="heading text-3xl">Welcome Back, Sana</h1>
            <p className="subheading mt-2 text-sm">Sign in to your account</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="label">Email</label>

              <div className="relative">
                <Mail className="text-secondary absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="input pl-10"
                />
              </div>

              {errors.email?.message && (
                <p className="error-text mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="label">Password</label>

              <div className="relative">
                <Lock className="text-secondary absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="input pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-secondary hover:text-primary absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password?.message && (
                <p className="error-text mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full py-3"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
