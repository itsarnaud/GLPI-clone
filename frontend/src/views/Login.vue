<script>
  export default {
    name: 'LoginView'
  };
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-xl p-8 space-y-5 rounded-lg border">
      <h1 class="text-2xl font-bold text-center">Connexion</h1>
      
      <UForm class="space-y-3">
        <UFormField label="Email" name="email">
          <UInput placeholder="email@exemple.com" class="w-full" />
        </UFormField>

        <UFormField label="Mot de passe" name="password">
          <UInput type="password" placeholder="•••••••" class="w-full" />
        </UFormField>

        <UButton type="submit" color="neutral" class="w-full">
          Se connecter
        </UButton>
      </UForm>
      
      <routerLink to="/" class="text-sm hover:underline">Mot de passe oublié ?</routerLink>
    </div>
  </div>
</template>
