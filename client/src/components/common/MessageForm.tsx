import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, MessageSquare, Send, Loader2 } from "lucide-react";
import { useSendMessage } from "../../hooks/messages/useSendMessage";

const messageSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MessageFormData = z.infer<typeof messageSchema>;

export default function MessageForm() {
  const { mutate: createMessage, isPending } = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (data: MessageFormData) => {
    createMessage(data, { onSuccess: () => reset() });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <FormInput 
            label="Name" 
            icon={<User size={16} />} 
            {...register("name")} 
            error={errors.name?.message} 
            placeholder="Jane Doe" 
        />
        
        <FormInput 
            label="Email" 
            icon={<Mail size={16} />} 
            {...register("email")} 
            error={errors.email?.message} 
            placeholder="jane@example.com" 
        />

        <FormInput 
            label="Subject" 
            {...register("subject")} 
            error={errors.subject?.message} 
            placeholder="Project inquiry" 
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-zinc-400" size={16} />
            <textarea
              {...register("message")}
              rows={4}
              className="w-full rounded-xl border border-zinc-200 bg-white px-10 py-3 text-sm outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-amber-500"
              placeholder="How can I help you?"
            />
          </div>
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-amber-500"
        >
          {isPending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

// Reusable input component for cleaner code
const FormInput = ({ label, icon, error, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</div>}
      <input
        {...props}
        className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-amber-500 ${icon ? "pl-10" : ""}`}
      />
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);
