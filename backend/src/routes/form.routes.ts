import { Router } from 'express';
import { submitForm, getFormSubmissions } from '../controllers/form.controller';

const router = Router();

router.get('/', getFormSubmissions);
router.post('/', submitForm);
router.post('/submit', submitForm);

export default router;
