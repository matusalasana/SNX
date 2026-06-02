import { MessagesRepository } from './messages.repository';
import { CreateMessageInput } from './messages.validation';

const getAllMessages = async () => {
  return MessagesRepository.findAll();
};

const createNewMessage = async (data: CreateMessageInput) => {
  return MessagesRepository.create(data);
};

const markAsRead = async (id: string, isRead: boolean) => {
  const updated = await MessagesRepository.updateReadStatus(id, isRead);
  if (!updated) {
    throw new Error('Message not found');
  }
  return updated;
};

const deleteMessage = async (id: string) => {
  const success = await MessagesRepository.deleteOne(id);
  if (!success) {
    throw new Error('Message not found');
  }
  return success;
};

export const MessagesService = {
  getAllMessages,
  createNewMessage,
  markAsRead,
  deleteMessage
};
