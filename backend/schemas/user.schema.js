import * as z from 'zod';

const RegistrationSchema = z.object({
  user: z.object({
    firstname: z.string().nonempty({ message: "Le prénom est requis." }).min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
    lastname:  z.string().nonempty({ message: "Le nom est requis." }).min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
    email:     z.string().nonempty({ message: "L'email est requis." }).email({ message: "Veuillez entrer une adresse email valide." }),
    password:  z.string().nonempty({ message: "Le mot de passe est requis." }).min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
    role:      z.enum(['ADMIN', 'USER']),
  }),
  company: z.object({
    name: z.string().nonempty({ message: "Le nom de l'entreprise est requis." }).min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères." }),
    description: z.string().optional(),
  }),
});

const CreateSchema = z.object({
  firstname: z.string().nonempty({ message: "Le prénom est requis." }).min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  lastname:  z.string().nonempty({ message: "Le nom est requis." }).min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email:     z.string().nonempty({ message: "L'email est requis." }).email({ message: "Veuillez entrer une adresse email valide." }),
  password:  z.string().nonempty({ message: "Le mot de passe est requis." }).min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
  role:      z.enum(['ADMIN', 'USER']),
});

const LoginSchema = z.object({
  email:    z.string().nonempty({ message: "L'email est requis." }).email({ message: "Veuillez entrer une adresse email valide." }),
  password: z.string().nonempty({ message: "Le mot de passe est requis." }),
});

export { RegistrationSchema, LoginSchema, CreateSchema };

