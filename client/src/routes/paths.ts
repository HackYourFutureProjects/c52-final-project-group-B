export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  TERMS: "/terms",
  FAQ: "/faq",
  DECKS: "/decks",
  DECK_CREATE: "/decks/create",
  DECK_DETAILS: (id: string) => `/decks/${id}`,
  DECK_EDIT: (id: string) => `/decks/${id}/edit`,
  DECK_CARD_MODE: (id: string) => `/decks/${id}/card-mode`,
  USER_PROFILE: "/users/me",
  PROFILE: "/profile",
  RESET_PASSWORD: "/reset-password",
  BROWSE: "/browse",
  NOT_FOUND: "/not-found",
} as const;

export type AppRoutes = typeof ROUTES;
