import { Router } from 'express';
import { createCrop } from '../controllers/cropController.ts';

const router = Router();

router.post('/', createCrop);

export default router;
