export const paths = {
  // EVERYBODY
  home: '/',
  all: '*',

  // NOT_LOGGED
  login: '/login',
  register: '/register',
  pokemon: (id: string) => `/pokemon/:${id}}`,

  // USER
  profile: '/profile',
};
