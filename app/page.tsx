
import { use } from 'react';
import { QueryClient } from '@tanstack/react-query';
import Homepage from '@/src/pages/Index';

// Create query client for server components
const getQueryClient = () => new QueryClient();

export default function Page() {
  const queryClient = getQueryClient();
  
  // Current date for the lastUpdated prop
  const lastUpdated = new Date().toISOString();
  
  return (
    <Homepage lastUpdated={lastUpdated} />
  );
}
