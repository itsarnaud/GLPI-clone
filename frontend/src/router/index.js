import { createRouter, createWebHistory } from 'vue-router'

// Auth views
import LoginView          from '@/views/auth/LoginView.vue';
import SignupView         from '@/views/auth/SignupView.vue';
import LostPasswordView   from '@/views/auth/LostPasswordView.vue';
import ResetPasswordView  from '@/views/auth/ResetPasswordView.vue';

// App views
import HomeView from '@/views/app/HomeView.vue'

const routes = [
  { path: '/', name: 'Accueil', component: HomeView },

  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  { path: '/lostpassword', name: 'Lost Password', component: LostPasswordView },
  { path: '/resetpassword/:id/:token', name: 'Reset Password', component: ResetPasswordView },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;