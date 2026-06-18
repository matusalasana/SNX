import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, MessageSquare, Send } from "lucide-react";
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
    createMessage(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <section className="max-w-2xl mx-auto py-16 px-6 text-white">
      
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">
          Get in <span className="text-amber-400">Touch</span>
        </h2>
        <p className="text-zinc-400 mt-2 text-sm">
          Send me a message and I’ll get back to you as soon as possible.
        </p>
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-xl"
      >
        {/* NAME */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Name
          </label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

            <input
              {...register("name")}
              placeholder="Your name"
              className="
                w-full pl-10 px-4 py-3 rounded-xl
                bg-zinc-950/60 border border-zinc-800
                text-white placeholder:text-zinc-600
                outline-none
                focus:border-amber-500/50
                focus:ring-2 focus:ring-amber-500/10
                transition
              "
            />
          </div>

          {errors.name && (
            <p className="text-red-400 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Email
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

            <input
              {...register("email")}
              placeholder="you@example.com"
              className="
                w-full pl-10 px-4 py-3 rounded-xl
                bg-zinc-950/60 border border-zinc-800
                text-white placeholder:text-zinc-600
                outline-none
                focus:border-amber-500/50
                focus:ring-2 focus:ring-amber-500/10
                transition
              "
            />
          </div>

          {errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* SUBJECT */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Subject
          </label>

          <input
            {...register("subject")}
            placeholder="What's this about?"
            className="
              w-full px-4 py-3 rounded-xl
              bg-zinc-950/60 border border-zinc-800
              text-white placeholder:text-zinc-600
              outline-none
              focus:border-amber-500/50
              focus:ring-2 focus:ring-amber-500/10
              transition
            "
          />

          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label className="text-sm text-zinc-300 mb-2 block">
            Message
          </label>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />

            <textarea
              {...register("message")}
              rows={5}
              placeholder="Write your message..."
              className="
                w-full pl-10 px-4 py-3 rounded-xl
                bg-zinc-950/60 border border-zinc-800
                text-white placeholder:text-zinc-600
                outline-none
                focus:border-amber-500/50
                focus:ring-2 focus:ring-amber-500/10
                transition
                resize-none
              "
            />
          </div>

          {errors.message && (
            <p className="text-red-400 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isPending}
          className="
            w-full flex items-center justify-center gap-2
            bg-amber-500 text-black
            py-3 rounded-xl
            font-medium
            hover:bg-amber-400
            transition
            disabled:opacity-50
          "
        >
          <Send className="w-4 h-4" />
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}