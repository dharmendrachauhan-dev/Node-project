import { Request, Response } from 'express';
import { AppError } from '../middlewares/error.middleware';

export interface FormSubmission {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
  services: string[];
  createdAt: string;
}

const submissions: FormSubmission[] = [];

export function getFormSubmissions(_req: Request, res: Response) {
  res.status(200).json({
    success: true,
    data: submissions,
    total: submissions.length,
  });
}

export function submitForm(req: Request, res: Response) {
  const { name, email, phone, organization, message, services } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    throw new AppError('Name is required', 400);
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    throw new AppError('Email is required', 400);
  }

  const newSubmission: FormSubmission = {
    _id: String(Date.now()),
    name: name.trim(),
    email: email.trim(),
    phone: phone ? String(phone).trim() : '',
    organization: organization ? String(organization).trim() : '',
    message: message ? String(message).trim() : '',
    services: Array.isArray(services) ? services : [],
    createdAt: new Date().toISOString(),
  };

  submissions.push(newSubmission);

  res.status(201).json({
    success: true,
    message: 'Form submitted successfully',
    data: newSubmission,
  });
}
