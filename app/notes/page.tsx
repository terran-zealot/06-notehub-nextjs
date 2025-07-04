import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import Notes from './Notes.client';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes({ page: 1, search: '', perPage: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes />
    </HydrationBoundary>
  );
}
