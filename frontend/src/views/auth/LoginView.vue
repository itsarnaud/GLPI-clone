<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter }     from 'vue-router';
  import Cookies from 'js-cookie';

  const router = useRouter();

  const state = reactive({
    email: '',
    password: ''
  })

  const formErrors = reactive({
    email: null,
    password: null
  });

  const error = ref(null);

  const formatIssue = (issue) => {
    if (!issue) return '';
    if (typeof issue === 'string') return issue;
    if (issue.message) return issue.message;
    try { return JSON.stringify(issue); } catch { return String(issue); }
  };

  const onSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        body: JSON.stringify(state),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await response.json();
      if (!response.ok) {
        formErrors.email    = null;
        formErrors.password = null;
        error.value = null;

        if (Array.isArray(data?.err)) {
          const leftovers = [];
          for (const issue of data.err) {
            const msg = formatIssue(issue);
            const field = Array.isArray(issue?.path) ? issue.path[0] : null;
            if (field && Object.prototype.hasOwnProperty.call(formErrors, field)) {
              formErrors[field] = msg;
            } else if (msg) {
              leftovers.push(msg);
            }
          }
          error.value = leftovers.length ? leftovers.join(' ') : null;
        } else {
          error.value = formatIssue(data?.err);
        }
        state.password = '';
        return;
      }

      state.password = '';
      state.email = '';
      formErrors.email = null;
      formErrors.password = null;
      error.value = null;
      
      Cookies.set('auth_token', data.token);
      return router.push('/');
    } catch (err) {
      console.error(err);
      error.value = 'Erreur interne.'
    }
  }
</script>

<template>
  <section class="flex justify-center flex-col lg:flex-row items-center min-h-screen p-3 gap-5">
    <div class="p-10 flex-col items-center gap-5 lg:w-[574px] lg:h-[670px] bg-tertiary-white rounded-2xl hidden lg:flex">
      <img src="/login_image.png" alt="Login">
      <h1 class="text-foreground font-bold text-3xl text-center">Connexion à Infranéo</h1>
      <p class="text-center text-secondary-gray">Accédez à votre espace pour gérer vos actifs informatiques, suivre vos tickets d'assistance et administrer vos licences en toute simplicité.</p>
    </div>
    <div class="flex p-3 sm:p-10 flex-col items-center gap-2 md:gap-5 lg:w-[574px] lg:h-[670px] bg-secondary-white rounded-2xl shadow-lg">
      <img src="/Infraneo_vertical.svg" alt="Infraneo Logo" class="h-20 md:h-28">
      <h1 class="text-foreground font-bold text-2xl md:text-3xl">Connectez-vous</h1>
      <p class="text-center text-secondary-gray mb-5">Entrez vos identifiants pour accéder à votre compte</p>
      <UForm :state="state" @submit="onSubmit" class="flex flex-col h-full w-full justify-between">
        <div class="space-y-7 mb-3">
          <UFormField label="Email" name="email" required :error="formErrors.email">
            <UInput v-model="state.email" placeholder="email@exemple.com" class="w-full" />
          </UFormField>

          <div>
            <UFormField label="Mot de passe" name="password" required :error="formErrors.password">
              <UInput v-model="state.password" type="password" placeholder="••••••••••••" class="w-full mb-1" />
            </UFormField>
            <a href="#" class="text-sm text-primary hover:underline">Mot de passe oublié ?</a>
          </div>

          <UAlert
            v-if="error"
            color="error"
            title="Une erreur est survenue."
            :description="error"
            icon="ci-circle-warning"
          />
        </div>

        <div>
          <UButton loading-auto loading-icon="mingcute:loading-3-line" type="submit" color="primary" class="w-full justify-center cursor-pointer mb-2">
            Se connecter
          </UButton>
          <p class="text-sm text-center">Vous n'avez pas de compte ? <a href="/signup" class="text-primary hover:underline">Créer un compte entreprise</a></p>
        </div>
      </UForm>
    </div>
  </section>
</template>
