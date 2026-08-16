import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2 } from "lucide-react";

import { useSendMessage } from "../../hooks/messages";
import {
  type MessageFormData,
  messageSchema,
} from "../../schema/messages";

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
        reset();
      },
    });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card space-y-5"
      >
        {/* Name */}
        <div>
          <label className="label">Name</label>

          <input
            {...register("name")}
            placeholder="John Doe"
            className="input"
          />

          {errors.name && (
            <p className="error-text mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>

          <input
            {...register("email")}
            type="email"
            placeholder="jane@example.com"
            className="input"
          />

          {errors.email && (
            <p className="error-text mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="label">Subject</label>

          <input
            {...register("subject")}
            placeholder="Project inquiry"
            className="input"
          />

          {errors.subject && (
            <p className="error-text mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="label">Message</label>

          <textarea
            {...register("message")}
            rows={12}
            placeholder="How can I help you?"
            className="textarea"
          />

          {errors.message && (
            <p className="error-text mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary w-full sm:w-auto"
        >
          {isPending ? (
            <Loader2
              size={16}
              className="animate-spin"
            />
          ) : (
            <Send size={16} />
          )}

          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}