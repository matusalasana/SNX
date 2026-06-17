import { MessagesRepository }
from "./messages.repository";

import {
  CreateMessageInput,
} from "./messages.validation";

const getAllMessages =
  async () => {
    return MessagesRepository.findAll();
  };

const createNewMessage =
  async (
    data: CreateMessageInput
  ) => {
    return MessagesRepository.create(data);
  };

const markAsRead = async (
  id: string,
  isRead: boolean
) => {
  const exists =
    await MessagesRepository.findById(id);

  if (!exists) {
    throw new Error(
      "Message not found"
    );
  }

  return MessagesRepository.updateReadStatus(
    id,
    isRead
  );
};

const deleteMessage =
  async (id: string) => {
    const exists =
      await MessagesRepository.findById(id);

    if (!exists) {
      throw new Error(
        "Message not found"
      );
    }

    return MessagesRepository.deleteOne(id);
  };

export const MessagesService = {
  getAllMessages,
  createNewMessage,
  markAsRead,
  deleteMessage,
};