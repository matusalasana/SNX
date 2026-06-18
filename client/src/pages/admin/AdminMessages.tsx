import { useState } from "react";
import { Trash2, Eye, Mail } from "lucide-react";
import { Skeleton } from "../../utils/skeleton";
import { useMessages } from "../../hooks/messages/useMessages";
import { useDeleteMessage } from "../../hooks/messages/useDeleteMessage";
import MessageCard from "../../components/admin/MessageCard";
import { Message } from "../../types/messages";

export default function AdminMessagesPage() {
  const { data: messages = [], isLoading } = useMessages();
  const { mutate: deleteMessage } = useDeleteMessage();

  const [selected, setSelected] = useState<Message | null>(null);

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-10 space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-72" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl border border-zinc-800"
            >
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-24 px-6 text-white">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">
          Messages <span className="text-amber-400">Inbox</span>
        </h1>
        <p className="text-zinc-400 mt-2">
          Manage contact form submissions from your portfolio.
        </p>
      </div>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT: LIST */}
        <div className="md:col-span-1 space-y-3">
          {messages.length === 0 && (
            <div className="text-zinc-500 text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" />
              No messages yet
            </div>
          )}

          {messages.map((msg: Message) => (
            <MessageCard
              key={msg.id}
              message={msg}
              isSelected={selected?.id === msg.id}
              onClick={() => setSelected(msg)}
            />
          ))}
        </div>

        {/* RIGHT: DETAIL VIEW */}
        <div className="md:col-span-2">

          {!selected ? (
            <div className="h-full flex items-center justify-center text-zinc-500 border border-zinc-800 rounded-2xl p-10">
              Select a message to view details
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">

              {/* HEADER */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selected.subject}
                  </h2>

                  <p className="text-sm text-zinc-400 mt-1">
                    {selected.name} • {selected.email}
                  </p>

                  <p className="text-xs text-zinc-500 mt-2">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">

                  {/* Mark as read (UI placeholder) */}
                  <button
                    className="p-2 rounded-lg border border-zinc-800 hover:border-amber-500/40 transition"
                    title="Mark as read"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => {
                      deleteMessage(selected.id);
                      setSelected(null);
                    }}
                    className="p-2 rounded-lg border border-zinc-800 hover:border-red-500/40 transition"
                    title="Delete message"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* MESSAGE BODY */}
              <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950/40 text-zinc-300 whitespace-pre-line leading-relaxed">
                {selected.message}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}