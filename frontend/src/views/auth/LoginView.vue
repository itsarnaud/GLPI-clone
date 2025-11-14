<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter }     from 'vue-router';
  import { formatErrors }  from '@/utils';
  import { API_REQUEST }   from '@/utils/apiRequest';

  import Cookies from 'js-cookie';
  import VAlert  from '@/components/ui/VAlert.vue';

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

  const onSubmit = async () => {
    try {
      const response = await API_REQUEST(`${import.meta.env.VITE_API_URL}/user/login`, state, 'POST');
      const data     = await response.json();
      if (!response.ok) {
        error.value = formatErrors(data?.err, formErrors);
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
    <div class="p-10 flex-col items-center gap-5 lg:w-[574px] lg:h-[700px] bg-tertiary-white rounded-2xl hidden lg:flex">
      <img src="/login_image.png" alt="Login">
      <h1 class="text-foreground font-bold text-3xl text-center">Connexion à Infranéo</h1>
      <p class="text-center text-secondary-gray">Accédez à votre espace pour gérer vos actifs informatiques, suivre vos tickets d'assistance et administrer vos licences en toute simplicité.</p>
    </div>
    <div class="flex p-3 sm:p-10 flex-col items-center gap-2 md:gap-5 lg:w-[574px] lg:h-[700px] bg-secondary-white rounded-2xl shadow-lg">
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

          <VAlert
            v-if="error"
            color="danger"
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
