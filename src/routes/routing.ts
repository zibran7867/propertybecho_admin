const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;

export const Routing = {
  Login: `${PATH_PREFIX}/login`,
  ForgotPassword: `${PATH_PREFIX}/forgot-password`,

  Dashboard: `${PATH_PREFIX}/dashboard`,

  ErrorPage: `${PATH_PREFIX}/error`,
  NotFound: `${PATH_PREFIX}/not-found`,
};
