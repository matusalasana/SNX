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
      <section className="container-custom section">
        <div className="space-y-3 mb-8">
          <Skeleton className="skeleton h-5 w-24" />
          <Skeleton className="skeleton h-9 w-64" />
        </div>

        <Skeleton className="skeleton h-[600px] rounded-2xl" />
      </section>
    );
  }

  return (
    <section className="container-custom section text-content">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-muted text-secondary">
            <Inbox className="w-5 h-5" />
          </div>

          <div>
            <h1 className="heading text-2xl font-semibold">Inbox</h1>
            <p className="subheading text-sm">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </p>
          </div>
        </div>
      </header>

      {/* Inbox Grid Layout */}
      <div className="card grid grid-cols-1 lg:grid-cols-[360px_1fr] min-h-[600px] overflow-hidden p-0">
        
        {/* Left: Message list */}
        <aside className="border-b lg:border-b-0 lg:border-r border-border max-h-[600px] overflow-y-auto">
          <div className="p-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
            <p className="subheading text-xs font-medium uppercase tracking-wider">
              Messages
            </p>
          </div>

          <div className="p-2 space-y-1">
            {messages.length === 0 ? (
              <div className="flex-center flex-col py-20 text-center">
                <Mail className="w-8 h-8 text-secondary mb-3" />
                <p className="subheading text-sm">No messages yet</p>
              </div>
            ) : (
              messages.map((message: Message) => (
                <div
                  key={message.id}
                  onClick={() => handleView(message)}
                  className={`cursor-pointer rounded-lg transition-colors ${
                    selected?.id === message.id
                      ? "ring-1 ring-border bg-muted"
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
        <main className="flex flex-col h-full bg-muted/30">
          {selected ? (
            <div className="flex flex-col h-full p-6">
              {/* Message Header Actions */}
              <div className="flex-between items-start pb-6 border-b border-border gap-4">
                <div>
                  <h2 className="heading text-xl font-semibold mb-2">
                    {selected.subject}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-secondary">
                    <User className="w-4 h-4 text-secondary" />
                    <span className="font-medium text-content">{selected.name}</span>
                    <span>&lt;{selected.email}&gt;</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selected.id)}
                    disabled={isPending}
                    className="p-2 rounded-lg text-secondary hover:text-content hover:bg-muted transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelected(null)}
                    className="btn-ghost p-2"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Message Body Content */}
              <div className="flex-1 py-6 overflow-y-auto">
                <p className="text-content leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              {/* Message Footer Action */}
              <div className="pt-4 border-t border-border flex justify-end">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                  className="btn-primary text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-center flex-col h-full p-12 text-center text-secondary">
              <Mail className="w-12 h-12 text-secondary/50 mb-4" />
              <p className="heading text-base font-medium">No message selected</p>
              <p className="subheading text-sm">Select a message from the list to view its details.</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}
