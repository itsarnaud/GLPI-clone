<script setup>
  import * as v from 'valibot'
  import { reactive } from 'vue';

  const schema = v.object({
    email:    v.pipe(v.string(), v.email('Veuillez entrer une adresse email valide.')),
    password: v.pipe(v.string(), v.minLength(8, 'Le mot de passe est requis.'))
  })

  const state = reactive({
    email: '',
    password: ''
  })

  const onSubmit = async (event) => {
    //TODO: Logique de login ici
    console.log(event.data)
  }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen p-3">
    <div class="w-full max-w-xl p-8 space-y-5 rounded-lg border">
      <h1 class="text-2xl font-bold text-center">Connexion</h1>
      
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-3">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="email@exemple.com" class="w-full" />
        </UFormField>

        <UFormField label="Mot de passe" name="password">
          <UInput v-model="state.password" type="password" placeholder="•••••••" class="w-full" />
        </UFormField>

        <UButton loading-auto loading-icon="mingcute:loading-3-line" type="submit" color="neutral">
          Se connecter
        </UButton>
      </UForm>

      <div class="space-y-2">
        <div class="text-sm">
          <span>Mot de passe oublié ? </span>
          <routerLink to="/lostpassword" class="text-sm text-primary-500 hover:underline">Cliquez ici !</routerLink>
        </div>

        <div class="text-sm">
          <span>Pas de compte ? </span>
          <routerLink to="/signup" class="text-sm text-primary-500 hover:underline">Inscrivez-vous !</routerLink>
        </div>
      </div>
    </div>
  </div>
</template>
