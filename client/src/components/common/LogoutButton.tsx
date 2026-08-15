import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useLogout } from "../../hooks/auth/useLogout";

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
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="
        flex w-full items-center justify-center gap-2
        border-t border-border
        px-4 py-3
        text-sm text-secondary
        transition-colors
        hover:bg-muted
        hover:text-danger
        disabled:pointer-events-none
        disabled:opacity-50
      "
    >
      {isPending ? (
        <>
          <span className="size-4 animate-spin rounded-full border-2 border-border border-t-primary" />
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