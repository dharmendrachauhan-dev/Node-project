import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middlewares/error.middleware';
import {
  Form,
  validateFormInput,
  AVAILABLE_SERVICES,
  ServiceType,
} from '../models/form.model';

export async function getFormSubmissions(_req: Request, res: Response, next: NextFunction) {
  try {
    const submissions = await Form.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: submissions,
      total: submissions.length,
    });
  } catch (error) {
    next(error);
  }
}

export async function submitForm(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, organization, message, services } = req.body;

    const validation = validateFormInput({
      name,
      email,
      phone,
      organization,
      message,
      services,
    });

    if (!validation.isValid) {
      const firstErrorMessage = Object.values(validation.errors)[0];
      throw new AppError(firstErrorMessage || 'Validation error', 400);
    }

    const validServices = Array.isArray(services)
      ? (services.filter((s) => AVAILABLE_SERVICES.includes(s as ServiceType)) as ServiceType[])
      : [];

    const newSubmission = await Form.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      organization: organization ? String(organization).trim() : '',
      message: message ? String(message).trim() : '',
      services: validServices,
    });

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: newSubmission,
    });
  } catch (error) {
    next(error);
  }
}
