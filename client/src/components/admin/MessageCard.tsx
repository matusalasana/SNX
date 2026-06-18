import { Mail, User, Clock } from "lucide-react";
import { Message } from "../../types/messages"

type Props = {
  message: Message;
  isSelected?: boolean;
  onClick?: () => void;
};

export default function MessageCard({
  message,
  isSelected,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-xl border p-4 transition
        ${
          isSelected
            ? "border-amber-500/40 bg-zinc-900/40"
            : "border-zinc-800 bg-zinc-900/20 hover:border-zinc-700"
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          
          {/* NAME + STATUS */}
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white text-sm">
              {message.name}
            </h3>

            {!message.isRead ? (
              <span className="text-[10px] text-amber-400 uppercase tracking-wider">
                New
              </span>
            ) : (
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                Read
              </span>
            )}
          </div>

          {/* SUBJECT */}
          <p className="text-sm text-amber-400 font-medium truncate mt-1">
            {message.subject}
          </p>
        </div>
      </div>

      {/* EMAIL */}
      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
        <Mail className="w-3 h-3" />
        <span className="truncate">{message.email}</span>
      </div>

      {/* PREVIEW */}
      <p className="text-xs text-zinc-500 line-clamp-2">
        {message.message}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-600">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{message.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>
            {new Date(message.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}