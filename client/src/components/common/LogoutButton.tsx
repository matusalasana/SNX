import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => navigate("/"),
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="
        w-full flex items-center justify-center gap-2
        border-t border-zinc-800
        px-4 py-3
        text-sm text-zinc-300
        hover:text-white hover:bg-zinc-900
        transition
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {isPending ? (
        <>
          <span className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
          <span>Logging out...</span>
        </>
      ) : (
        <>
          <LogOut size={18} />
          <span>Logout</span>
        </>
      )}
    </button>
  );
};

export default LogoutButton;