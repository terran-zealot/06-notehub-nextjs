import axios, { AxiosResponse } from 'axios';
import { Note, CreateNoteParams, FetchNotesParams, FetchNotesResponse } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const BEARER_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
};

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim()) params.search = search.trim();

  const response: AxiosResponse<FetchNotesResponse> = await axios.get(BASE_URL, {
    headers,
    params,
  });

  return response.data;
}

export const getSingleNote = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`${BASE_URL}/${id}`, { headers });
  return res.data;
};

export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response: AxiosResponse<Note> = await axios.post(BASE_URL, note, { headers });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return response.data;
}
