import { QueryClient } from '@tanstack/react-query';

const ONE_MINUTE_MS = 60_000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE_MS,
      retry: 2,
    },
  },
});
