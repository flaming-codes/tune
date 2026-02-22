'use server'

import { z } from 'zod'

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name muss mindestens 2 Zeichen enthalten')
    .max(100, 'Name darf maximal 100 Zeichen enthalten'),
  email: z
    .string()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
    .max(255, 'E-Mail darf maximal 255 Zeichen enthalten'),
  phone: z
    .string()
    .max(50, 'Telefon darf maximal 50 Zeichen enthalten')
    .optional()
    .or(z.literal('')),
  subject: z.enum(['termin', 'notfall', 'beratung', 'feedback', 'sonstiges'], {
    message: 'Bitte wählen Sie einen Betreff',
  }),
  message: z
    .string()
    .min(10, 'Nachricht muss mindestens 10 Zeichen enthalten')
    .max(5000, 'Nachricht darf maximal 5000 Zeichen enthalten'),
})

export type ContactFormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    subject?: string[]
    message?: string[]
  }
}

/**
 * Server Action to handle contact form submissions
 * Uses Next.js 16 Server Actions with useActionState pattern
 */
export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Extract form data
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  }

  // Validate form data
  const validatedFields = contactFormSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      message: 'Validierung fehlgeschlagen',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, phone, subject, message } = validatedFields.data

  try {
    // TODO: Implement actual email sending logic here
    // For now, we simulate a successful submission with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Example implementation options:
    // 1. Send email using nodemailer or similar
    // 2. Save to database via Payload CMS
    // 3. Send to external service (SendGrid, Resend, etc.)

    // Log for development (remove in production)
    console.log('Contact form submission:', {
      name,
      email,
      phone: phone || 'Nicht angegeben',
      subject,
      message: message.substring(0, 100) + '...',
      timestamp: new Date().toISOString(),
    })

    // Return success state
    // This will be picked up by useActionState and reset the form
    return {
      message:
        'Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden.',
    }
  } catch (error) {
    console.error('Contact form submission error:', error)

    return {
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
      errors: {
        message: ['Serverfehler - bitte später erneut versuchen'],
      },
    }
  }
}
