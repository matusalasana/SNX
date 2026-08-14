import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, MessageSquare, Send, Loader2 } from "lucide-react";

import { useSendMessage } from "../../hooks/messages";
import { type MessageFormData, messageSchema } from "../../schema/messages";


export default function MessageForm() {
  const { mutate: sendMessage, isPending } = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (data: MessageFormData) => {
    sendMessage(data, { 
      onSuccess: () => {
      reset()
      onSuccess?.()
    }}
    );
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div>
          <label className="label">Name</label>
          <input 
            {...register("name")} 
            placeholder="John Doe" 
            className="input" 
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="label">Email</label>
          <input 
            {...register("email")} 
            placeholder="jane@example.com" 
            className="input" 
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        
        <div>
          <label className="label">Subject</label>
          <input 
            {...register("subject")} 
            placeholder="Project inquiry" 
            className="input" 
          />
          {errors.subject && <p className="error-text">{errors.subject.message}</p>}
        </div>

        <div>
          <label className="label">Message</label>
          <textarea
            {...register("message")}
            rows={12}
            placeholder="How can I help you?"
            className="textarea"
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary"
        >
          {isPending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}