import { Router } from 'express';
import { verifyToken } from '../middlewares/Auth.js';
import { searchContacts } from '../controllers/Contacts.js';
const contactsRouter = Router();

contactsRouter.post("/search", verifyToken, searchContacts)

export default contactsRouter;
