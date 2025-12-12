<script setup>
  import { reactive, ref } from 'vue';
  import { useRouter }     from 'vue-router';
  import { formatErrors }  from '@/utils';
  import { API_REQUEST }   from '@/utils/apiRequest';
  import Cookies           from 'js-cookie';
  import VAlert            from '@/components/ui/VAlert.vue';

  const router = useRouter();

  const step = ref(1);
  const maxStep = 3;

  let show1 = ref(false);
  let show2 = ref(false);
  
  const stepTitles = {
    1: "Informations sur l'entreprise",
    2: "Compte de l'administrateur",
    3: "Sécurité du compte administrateur"
  };

  const industryOptions = [
    { label: 'Informatique / Télécoms', value: 'IT' },
    { label: 'Finance / Banque / Assurance', value: 'Finance' },
    { label: 'Santé / Médical', value: 'Health' },
    { label: 'Industrie / BTP', value: 'Industry' },
    { label: 'Commerce / Distribution', value: 'Retail' },
    { label: 'Services aux entreprises', value: 'Services' },
    { label: 'Secteur public / Éducation', value: 'Public' },
    { label: 'Autre', value: 'Other' }
  ];

  const employeeCountOptions = [
    { label: '1-10 employés', value: '1-10' },
    { label: '11-50 employés', value: '11-50' },
    { label: '51-200 employés', value: '51-200' },
    { label: '201-500 employés', value: '201-500' },
    { label: '500+ employés', value: '500+' }
  ];

  const state = reactive({
    user: {
      firstname:  '',
      lastname:   '',
      email:      '',
      password:   '',
      password2:  ''
    },
    company: {
      name:        '',
      description: '',
    }
  });

  const formErrors = reactive({
    user: {
      firstname:  null,
      lastname:   null,
      email:      null,
      password:   null,
      password2:  null,
    },
    company: {
      name:        null,
      description: null
    }
  });

  const error   = ref(null);
  const loading = ref(false);

  const clearStepErrors = (s) => {
    if (s === 1) {
      formErrors.company.name = null;
      // formErrors.company.industry = null;
      // formErrors.company.count = null;
    } else if (s === 2) {
      formErrors.user.lastname = null;
      formErrors.user.firstname = null;
      formErrors.user.email = null;
    } else if (s === 3) {
      formErrors.password = null;
    }
  };

  const validateStep = (s) => {
    let valid = true;
    clearStepErrors(s);

    if (s === 1) {
      if (!state.company.name || state.company.name.trim().length < 2) {
        formErrors.company.name = "Le nom de l'entreprise est requis.";
        valid = false;
      }
      // if (!state.industry) {
      //   formErrors.industry = "Le secteur d'activité est requis.";
      //   valid = false;
      // }
      // if (!state.employeeCount) {
      //   formErrors.employeeCount = "Le nombre d'employés est requis.";
      //   valid = false;
      // }
    }

    if (s === 2) {
      if (!state.user.lastname || state.user.lastname.trim().length < 2) {
        formErrors.user.lastname = 'Le nom est requis (min 2 caractères).';
        valid = false;
      }
      if (!state.user.firstname || state.user.firstname.trim().length < 2) {
        formErrors.user.firstname = 'Le prénom est requis (min 2 caractères).';
        valid = false;
      }
      const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
      if (!state.user.email || !emailRegex.test(state.user.email)) {
        formErrors.user.email = 'Veuillez entrer une adresse email valide.';
        valid = false;
      }
    }

    if (s === 3) {
      if (!state.user.password || state.user.password.length < 8) {
        formErrors.user.password = 'Le mot de passe doit contenir au moins 8 caractères.';
        valid = false
      }
      if (!state.user.password2 || state.user.password2 !== state.user.password) {
        formErrors.user.password2 = 'La confirmation doit correspondre au mot de passe.';
        valid = false;
      }
    }

    return valid;
  };

  const nextStep = () => {
    if (validateStep(step.value)) {
      step.value = Math.min(step.value + 1, maxStep);
      error.value = null;
    }
  };

  const prevStep = () => {
    step.value = Math.max(step.value - 1, 1);
    error.value = null;
  };

  const onSubmit = async () => {
    if (!validateStep(3)) return;
    loading.value = true;
    error.value = null;
    try {
      const payload = {
        data: {
          user: {
            firstname: state.user.firstname.trim(),
            lastname:  state.user.lastname.trim(),
            email:     state.user.email.trim(),
            password:  state.user.password,
          },
          company: {
            name: state.company.name.trim(),
            description: `${state.industry} • ${state.employeeCount}`,
          }
        }
      };

      const response = await API_REQUEST(`${import.meta.env.VITE_API_URL}/user/signup`, payload, 'POST');
      const data     = await response.json();
      if (!response.ok) {
        error.value = formatErrors(data?.err);
        return;
      }

      Object.keys(state).forEach(k => state[k] = '');
      Object.keys(formErrors).forEach(k => formErrors[k] = null);
      Cookies.set('auth_token', data.token);
      return router.push('/');
    } catch (err) {
      console.error(err);
      error.value = 'Erreur interne.';
    } finally {
      loading.value = false;
    }
  };
</script>

<template>
  <section class="flex justify-center flex-col lg:flex-row items-center min-h-screen p-3 gap-5">
    <div class="p-10 flex-col items-center justify-center gap-5 lg:w-[574px] lg:h-[700px] bg-tertiary-white rounded-2xl hidden lg:flex">
      <img :src="step === 3 ? '/password_image.png' : '/login_image.png'" alt="Illustration" class="max-w-full h-auto object-contain">
      <h1 class="text-foreground font-bold text-3xl text-center">Bienvenue sur Infranéo</h1>
      <p class="text-center text-secondary-gray">
        Créez un compte entreprise pour gérer efficacement tous vos actifs informatiques, tickets d'assistance et licences en un seul endroit.
      </p>
    </div>

    <div class="flex p-6 sm:p-10 flex-col items-center gap-4 lg:w-[574px] lg:h-[700px] bg-secondary-white rounded-2xl shadow-xl">
      <img src="/Infraneo_vertical.svg" alt="Infraneo Logo" class="h-20 md:h-28">
      
      <div class="w-full text-center space-y-2 mb-4">
        <h1 class="text-foreground font-bold text-2xl md:text-3xl">Créer un compte entreprise</h1>
        <p class="text-sm text-secondary-gray font-medium">Etape {{ step }} : {{ stepTitles[step] }}</p>
        
        <div class="flex gap-2 mt-2 w-full max-w-xs mx-auto">
          <div class="h-1.5 rounded-full flex-1 transition-colors duration-300" :class="step >= 1 ? 'bg-primary' : 'bg-gray-200'"></div>
          <div class="h-1.5 rounded-full flex-1 transition-colors duration-300" :class="step >= 2 ? 'bg-primary' : 'bg-gray-200'"></div>
          <div class="h-1.5 rounded-full flex-1 transition-colors duration-300" :class="step >= 3 ? 'bg-primary' : 'bg-gray-200'"></div>
        </div>
      </div>

      <UForm :state="state" @submit="onSubmit" class="flex flex-col h-full w-full justify-between">
        <div class="space-y-5 flex-1">
          
          <div v-if="step === 1" class="space-y-5 animate-fade-in">
            <UFormField label="Nom de l'entreprise" name="companyName" required :error="formErrors.company.name">
              <UInput v-model="state.company.name" placeholder="Infranéo" class="w-full" />
            </UFormField>

            <UFormField label="Secteur d'activité" name="industry" required>
              <USelect :items="industryOptions" placeholder="Choisir une activité" class="w-full" />
            </UFormField>

            <UFormField label="Nombre d'employé" name="employeeCount" required>
              <USelect :items="employeeCountOptions" placeholder="Choisir un nombre d'employé" class="w-full" />
            </UFormField>
          </div>

          <div v-else-if="step === 2" class="space-y-5 animate-fade-in">
            <UFormField label="Prénom de l'administrateur" name="user.firstname" required :error="formErrors.user.firstname">
              <UInput v-model="state.user.firstname" placeholder="John" class="w-full" />
            </UFormField>

            <UFormField label="Nom de l'administrateur" name="adminLastName" required :error="formErrors.user.lastname">
              <UInput v-model="state.user.lastname" placeholder="DOE" class="w-full" />
            </UFormField>

            <UFormField label="Email" name="email" required :error="formErrors.user.email">
              <UInput v-model="state.user.email" placeholder="john.doe@exemple.com" class="w-full" />
            </UFormField>
          </div>

          <div v-else class="space-y-5 animate-fade-in">
            <UFormField label="Mot de passe" name="password" required :error="formErrors.user.password">
              <UInput v-model="state.user.password" :type="show1 ? 'text' : 'password'" placeholder="••••••••••••" class="w-full" :ui="{ icon: { trailing: { pointer: '' } } }">
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="show1 ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show1 ? 'Hide password' : 'Show password'"
                    :aria-pressed="show1"
                    aria-controls="password"
                    @click="show1 = !show1"
                  />
                </template>
              </UInput>
            </UFormField>

            <UFormField label="Confirmation du mot de passe" name="password2" required :error="formErrors.user.password2">
              <UInput v-model="state.user.password2" :type="show2 ? 'text' : 'password'" placeholder="••••••••••••" class="w-full">
                <template #trailing>
                  <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="show2 ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show2 ? 'Hide password' : 'Show password'"
                    :aria-pressed="show2"
                    aria-controls="password2"
                    @click="show2 = !show2"
                  />
                </template>
              </UInput>
            </UFormField>
          </div>

          <VAlert
            v-if="error"
            color="danger"
            title="Une erreur est survenue."
            :description="error"
            icon="ci-circle-warning"
            class="mt-4"
          />
        </div>

        <div class="mt-6">
          <div v-if="step === 1">
            <UButton trailing-icon="i-lucide-move-right" color="primary" @click="nextStep" class="mb-2 cursor-pointer w-full justify-center">
              Suivant
            </UButton>
            <p class="text-sm text-center">
              Vous avez déjà un compte ? <a href="/login" class="text-primary hover:underline">Se connecter</a>
            </p>
          </div>

          <div v-else-if="step === 2" class="flex gap-4 items-center">
            <UButton icon="i-lucide-move-left" color="white" variant="solid" class="justify-center border border-gray-200 hover:bg-gray-50 text-gray-700" @click="prevStep">
              Retour
            </UButton>
            <UButton trailing-icon="i-lucide-move-right" color="primary" class="flex-1 justify-center" @click="nextStep">
              Suivant
            </UButton>
          </div>

          <div v-else class="flex gap-4 items-center">
            <UButton icon="i-lucide-move-left" color="white" variant="solid" class="justify-center border border-gray-200 hover:bg-gray-50 text-gray-700" @click="prevStep">
              Retour
            </UButton>
            <UButton block :loading="loading" color="primary" type="submit" class="flex-1 justify-center">
              S'inscrire
            </UButton>
          </div>
        </div>
      </UForm>
    </div>
  </section>
</template>
