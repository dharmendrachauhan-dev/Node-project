import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Service Tags matching frontend Form.jsx
 */
export const AVAILABLE_SERVICES = [
  'SEO',
  'Web Development',
  'Content Writing',
  'Web hosting',
  'PPC',
  'UI/UX',
  'E-commerce',
  'Software Development',
  'Advertisement',
  'Influencer Marketing',
  'Brand Identity',
  'Custom Website Design',
  'Performance Marketing',
  'Social Media Marketing',
  'Email Marketing',
] as const;

export type ServiceType = (typeof AVAILABLE_SERVICES)[number];

export interface IFormDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
  services: ServiceType[];
  createdAt: Date;
  updatedAt: Date;
}

export type FormSubmission = IFormDocument;

export interface CreateFormDTO {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
  services?: ServiceType[] | string[];
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

const formSchema = new Schema<IFormDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    organization: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    services: {
      type: [String],
      enum: {
        values: AVAILABLE_SERVICES,
        message: '{VALUE} is not a valid service',
      },
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Validates form submission input before saving
 */
export function validateFormInput(data: Partial<CreateFormDTO>): FormValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string' || !data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (data.phone && typeof data.phone === 'string' && data.phone.trim()) {
    const phoneClean = data.phone.trim();
    if (phoneClean.length > 15) {
      errors.phone = 'Phone number is too long';
    }
  }

  if (data.organization && typeof data.organization === 'string' && data.organization.trim()) {
    if (data.organization.trim().length > 100) {
      errors.organization = 'Organization name must be under 100 characters';
    }
  }

  if (data.services) {
    if (!Array.isArray(data.services)) {
      errors.services = 'Services must be an array of selected tags';
    } else {
      const invalidServices = data.services.filter(
        (service) => !AVAILABLE_SERVICES.includes(service as ServiceType)
      );
      if (invalidServices.length > 0) {
        errors.services = `Invalid service tag(s): ${invalidServices.join(', ')}`;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export const Form: Model<IFormDocument> =
  mongoose.models.Form || mongoose.model<IFormDocument>('Form', formSchema);

export default Form;
