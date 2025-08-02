
import axios, {type AxiosResponse } from 'axios';
import { Note } from '../types/note';


export type NoteListResponse = {
  notes: Note[];
  total: number;
};

axios.defaults.baseURL = "https://next-docs-api.onrender.com";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNotes = async () => {
  await delay(2000);
  const res = await axios.get<NoteListResponse>('/notes');
  return res.data;
};


export const getSingleNote = async (id: string) => {
    const res = await axios.get<Note>(`/notes/${id}`);
    return res.data;
};
  


const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const BEARER_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${BEARER_TOKEN}`,
};

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}



export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response: AxiosResponse<Note> = await axios.post(BASE_URL, note, { headers });
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return response.data;
}









export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  const response: AxiosResponse<FetchNotesResponse> = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    params,
  });

  return response.data;
}
