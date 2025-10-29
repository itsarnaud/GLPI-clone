import * as z from 'zod';

const RegistrationSchema = z.object({
  firstname:  z.string().min(2, { error: 'Le prénom doit contenir au moins 2 caractères.' }),
  lastname:   z.string().min(2, { error: 'Le nom doit contenir au moins 2 caractères.' }),
  email:      z.email({ error: 'Veuillez entrer une adresse email valide.' }),
  password:   z.string().min(8, { error: 'Le mot de passe doit contenir au moins 8 caractères.' }),
  // Add more required properties
});

const LoginSchema = z.object({
  email:    z.email({ error: 'Veuillez entrer une adresse email valide.' }),
  password: z.string({ error: 'Le mot de passe est requis.' })
});

export { RegistrationSchema, LoginSchema };

