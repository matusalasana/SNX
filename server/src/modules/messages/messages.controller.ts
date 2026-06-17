import { Request, Response } from 'express';
import { MessagesService } from './messages.service';
import { createMessageSchema } from './messages.validation';

const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await MessagesService.getAllMessages();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = createMessageSchema.safeParse(req.body);
    if (!validated.success) {
      res.status(400).json({ error: 'Validation failed', details: validated.error.format() });
      return;
    }
    const newMsg = await MessagesService.createNewMessage(validated.data);
    res.status(201).json(newMsg);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;
    const updated = await MessagesService.markAsRead(
      id as string, 
      is_read
    );
    res.json(updated);
  } catch (err: any) {
    const statusCode = err.message === 'Message not found' ? 404 : 500;
    res.status(statusCode).json({ error: err.message });
  }
};

const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await MessagesService.deleteMessage(id as string);
    res.json({ message: 'Message successfully deleted' });
  } catch (err: any) {
    const statusCode = err.message === 'Message not found' ? 404 : 500;
    res.status(statusCode).json({ error: err.message });
  }
};

export const MessagesController = {
  getMessages,
  createMessage,
  markAsRead,
  deleteMessage
};
