<script setup>
  import * as v from 'valibot'
  import { reactive } from 'vue';

  const schema = v.pipe(
    v.object({
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
    password1: '', 
    password2: '' 
  })

  const onSubmit = async (event) => {
    //TODO: Logique du reset password ici
    console.log(event.data)
  }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen p-3">
    <div class="w-full max-w-xl p-8 space-y-5 rounded-lg border">
      <h1 class="text-2xl font-bold text-center">Reinitialiser le mot de passe</h1>
      
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-3">
        <UFormField label="Mot de passe" name="password1">
          <UInput v-model="state.password1" type="password" placeholder="•••••••" class="w-full" />
        </UFormField>

        <UFormField label="Confirmer le mot de passe" name="password2">
          <UInput v-model="state.password2" type="password" placeholder="•••••••" class="w-full" />
        </UFormField>

        <UButton loading-auto loading-icon="mingcute:loading-3-line" type="submit" color="neutral">
          Envoyer
        </UButton>
      </UForm>

      <div class="space-y-2">
        <div class="text-sm">
          <span>Mot de passe retrouvé ? </span>
          <routerLink to="/login" class="text-sm text-primary-500 hover:underline">Connectez vous !</routerLink>
        </div>
      </div>
    </div>
  </div>
</template>
