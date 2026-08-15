import { useState } from "react";
import { Mail, Inbox, Trash2, X, User } from "lucide-react";
import { Skeleton } from "../../utils/skeleton";
import { useMessages } from "../../hooks/messages/useMessages";
import { useDeleteMessage } from "../../hooks/messages/useDeleteMessage";
import MessageCard from "../../components/admin/MessageCard";
import { MessageFormData } from "../../schema/messages";

// Interface for database message including unique ID
interface Message extends MessageFormData {
  id: string;
  createdAt?: string;
}

export default function AdminMessagesPage() {
  const { data: messages = [], isLoading } = useMessages();
  const { mutate: deleteMessage, isPending } = useDeleteMessage();

  const [selected, setSelected] = useState<Message | null>(null);

  const handleView = (message: Message) => {
    setSelected(message);
  };

  const handleDelete = (id: string) => {
    // Clear selection if the currently viewed message is deleted
    if (selected?.id === id) {
      setSelected(null);
    }
    deleteMessage(id);
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-3 mb-8">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-64" />
        </div>

        <Skeleton className="h-[600px] rounded-2xl" />
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 text-white">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Inbox className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">Inbox</h1>
            <p className="text-sm text-zinc-500">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </p>
          </div>
        </div>
      </header>

      {/* Inbox Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] min-h-[600px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        
        {/* Left: Message list */}
        <aside className="border-b lg:border-b-0 lg:border-r border-zinc-800 max-h-[600px] overflow-y-auto">
          <div className="p-4 border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur z-10">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Messages
            </p>
          </div>

          <div className="p-2 space-y-1">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Mail className="w-8 h-8 text-zinc-700 mb-3" />
                <p className="text-sm text-zinc-500">No messages yet</p>
              </div>
            ) : (
              messages.map((message: Message) => (
                <div
                  key={message.id}
                  onClick={() => handleView(message)}
                  className={`cursor-pointer rounded-lg transition-colors ${
                    selected?.id === message.id
                      ? "ring-1 ring-amber-500/50 bg-amber-500/5"
                      : ""
                  }`}
                >
                  <MessageCard
                    name={message.name}
                    email={message.email}
                    subject={message.subject}
                    message={message.message}
                    isDeleting={isPending}
                    onView={() => handleView(message)}
                    onDelete={() => handleDelete(message.id)}
                  />
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Right: Selected Message Reader Detail View */}
        <main className="flex flex-col h-full bg-zinc-900/30">
          {selected ? (
            <div className="flex flex-col h-full p-6">
              {/* Message Header Actions */}
              <div className="flex items-start justify-between pb-6 border-b border-zinc-800 gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-100 mb-2">
                    {selected.subject}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <User className="w-4 h-4 text-amber-400" />
                    <span className="font-medium text-zinc-200">{selected.name}</span>
                    <span>&lt;{selected.email}&gt;</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selected.id)}
                    disabled={isPending}
                    className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Message Body Content */}
              <div className="flex-1 py-6 overflow-y-auto">
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              {/* Message Footer Action */}
              <div className="pt-4 border-t border-zinc-800 flex justify-end">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-medium hover:bg-amber-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center text-zinc-500">
              <Mail className="w-12 h-12 text-zinc-700 mb-4" />
              <p className="text-base font-medium text-zinc-400">No message selected</p>
              <p className="text-sm">Select a message from the list to view its details.</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
