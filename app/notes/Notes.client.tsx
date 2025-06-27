'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import css from './Notes.module.css';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '../../components/noteList/noteList';
import NoteModal from '@/components/NoteModal/NoteModal';


import { fetchNotes } from '@/lib/api';
import { type FetchNotesResponse } from '@/lib/api';

export default function Notes() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, perPage: 12 }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Error loading notes.</p>;

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}

      {totalPages > 1 && (
        <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPages} />
      )}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
