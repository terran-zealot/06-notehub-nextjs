
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import Notes from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '../../types/note';

export default async function NotesPage() {
  const queryClient = new QueryClient();


  const initialData: FetchNotesResponse = await fetchNotes({
    page: 1,
    search: '',
    perPage: 12,
  });

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => Promise.resolve(initialData),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes initialData={initialData} />
    </HydrationBoundary>
  );
}
