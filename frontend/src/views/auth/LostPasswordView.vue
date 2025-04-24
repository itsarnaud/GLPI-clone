<script setup>
  import * as v from 'valibot'
  import { reactive } from 'vue';

  const schema = v.object({
    email: v.pipe(v.string(), v.email('Veuillez entrer une adresse email valide.'))
  })

  const state = reactive({ email: '' })

  const onSubmit = async (event) => {
    //TODO: Logique du lost password ici (envoie de mail etc...)
    console.log(event.data)
  }
</script>

<template>
  <div class="flex justify-center items-center min-h-screen p-3">
    <div class="w-full max-w-xl p-8 space-y-5 rounded-lg border">
      <h1 class="text-2xl font-bold text-center">Mot de passe oublié</h1>
      
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-3">
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" placeholder="email@exemple.com" class="w-full" />
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
