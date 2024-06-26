'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const [queryClient] = useState(
    () => new QueryClient(),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default Providers;