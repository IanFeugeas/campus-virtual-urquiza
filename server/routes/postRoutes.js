import express from 'express';
import { createPost, getPosts, getPostById } from '../controllers/postController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getPosts);

router.post('/', auth, createPost);

router.get('/:id', auth, getPostById); 

export default router;