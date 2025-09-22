const PATH_PREFIX = import.meta.env.VITE_PATH_PREFIX;

export const Routing = {
  Login: `${PATH_PREFIX}/login`,
  ForgotPassword: `${PATH_PREFIX}/forgot-password`,

  Dashboard: `${PATH_PREFIX}/dashboard`,
  Builder_Management: `${PATH_PREFIX}/builder_management`,
  Area_Management: `${PATH_PREFIX}/area_management`,
  Users: `${PATH_PREFIX}/users`,
  Brokers: `${PATH_PREFIX}/brokers`,

  ErrorPage: `${PATH_PREFIX}/error`,
  NotFound: `${PATH_PREFIX}/not-found`,
};
