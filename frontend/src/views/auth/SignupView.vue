<script setup>
  import * as v from 'valibot'
  import { reactive } from 'vue';

  const schema = v.pipe(
    v.object({
      firstName:  v.pipe(v.string(), v.minLength(1, 'Le prénom est requis.')),
      lastName:   v.pipe(v.string(), v.minLength(1, 'Le nom est requis.')),
      username:   v.pipe(v.string(), v.minLength(1, 'Le nom d\'utilisateur est requis.')),
      email:      v.pipe(v.string(), v.email('Veuillez entrer une adresse email valide.')),
      password1:  v.pipe(v.string(), v.minLength(8, 'Le mot de passe doit contenir au moins 8 caractères.')),
      password2:  v.string()
    }),
    v.forward(
      v.partialCheck(
        [['password1'], ['password2']],
        (input) => input.password1 === input.password2,
        'Les mots de passes ne correspondent pas.'
      ),
      ['password2']
    )
  );

  const state = reactive({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password1: '',
    password2: ''
  })

  const onSubmit = async (event) => {
    //TODO: Logique de login ici
    console.log(event.data)
  }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen p-3">
    <div class="w-full max-w-xl p-8 space-y-5 rounded-lg border">
      <h1 class="text-2xl font-bold text-center">Inscription</h1>
      
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-3">
        <UFormField label="Prénom" name="firstName">
          <UInput v-model="state.firstName" placeholder="John" class="w-full" />
        </UFormField>

        <UFormField label="Nom" name="lastName">
          <UInput v-model="state.lastName" placeholder="Doe" class="w-full" />
        </UFormField>

        <UFormField label="Nom d'utilisateur" name="username">
          <UInput v-model="state.username" placeholder="johndoe" class="w-full" />
        </UFormField>
        
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="email@exemple.com" class="w-full" />
        </UFormField>

        <UFormField label="Mot de passe" name="password1">
          <UInput v-model="state.password1" type="password" placeholder="•••••••" class="w-full" />
        </UFormField>

        <UFormField label="Confirmer le mot de passe" name="password2">
          <UInput v-model="state.password2" type="password" placeholder="•••••••" class="w-full" />
        </UFormField>

        <UButton loading-auto loading-icon="mingcute:loading-3-line" type="submit" color="neutral">
          Se connecter
        </UButton>
      </UForm>
      
      <div class="text-sm">
        <span>Déjà un compte ? </span>
        <routerLink to="/login" class="text-sm text-primary-500 hover:underline">Connectez-vous !</routerLink>
      </div>
    </div>
  </div>
</template>
