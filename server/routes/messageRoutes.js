import express from 'express';
import { upload } from '../configs/multer.js';
import { protect } from '../middlewares/Auth.js';
import { getChatMessages, sendMessage, serverSideController } from '../controllers/MessageController.js';

const messageRouter = express.Router()

messageRouter.get('/:userId', serverSideController);
messageRouter.post('/send', upload.single('image'), protect, sendMessage);
messageRouter.post('/get', protect, getChatMessages);


export default messageRouter;