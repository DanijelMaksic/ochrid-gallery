import { z } from 'zod';

export const reviewFormSchema = z.object({
   username: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*Username must contain at least 2 character')
      .max(30, '*Username must contain no more than 30 characters'),
   title: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*Title must contain at least 2 characters')
      .max(60, '*Title must contain no more than 60 characters'),
   content: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*Content must contain at least 2 characters')
      .max(1000, '*Content must contain no more than 1000 characters'),
   recommended: z.boolean(),
});

export const addressFormSchema = z.object({
   billing_name: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*Name must contain at least 2 characters')
      .max(30, '*Name must contain no more than 30 characters'),
   billing_address: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*Address must contain at least 2 characters')
      .max(80, '*Address must contain no more than 80 characters'),
   billing_city: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*City must contain at least 2 characters')
      .max(50, '*City must contain no more than 30 characters'),
   billing_post_code: z
      .number()
      .min(1, '*This field is required')
      .int()
      .gte(100, '*Post Code must contain at least 3 digits')
      .lte(9999999999, '*Post Code must not exceed 10 digits'),
   billing_phone: z
      .number()
      .min(1, '*This field is required')
      .int()
      .gte(100000, '*Phone number must contain at least 6 digits')
      .lte(999999999999999, '*Phone number must not exceed 15 digits'),
});

export const orderFormSchema = z.object({
   full_name: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*Name must contain at least 2 characters')
      .max(30, '*Name must contain no more than 30 characters'),
   address: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*Address must contain at least 2 characters')
      .max(80, '*Address must contain no more than 80 characters'),
   city: z
      .string()
      .nonempty('*This field is required')
      .min(2, '*City must contain at least 2 characters')
      .max(50, '*City must contain no more than 30 characters'),
   post_code: z
      .number()
      .min(1, '*This field is required')
      .int()
      .gte(100, '*Post Code must contain at least 3 digits')
      .lte(9999999999, '*Post Code must not exceed 10 digits'),
   phone: z
      .number()
      .min(1, '*This field is required')
      .int()
      .gte(100000, '*Phone number must contain at least 6 digits')
      .lte(999999999999999, '*Phone number must not exceed 15 digits'),
});

export const noteSchema = z
   .string()
   .max(200, '*Note must contain no more than 200 characters');
