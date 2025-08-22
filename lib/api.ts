import axios from "axios";
import type { NewNote, Note, NoteTagType } from "@/types/note";
    
export interface NotesHttpResponse {
    notes: Note[];
    totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

// отримати список нотаток
export const fetchNotes = async (query: string, page: number, tag?:NoteTagType): Promise<NotesHttpResponse> => {
    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const endPoint = '/notes';

    const params = {
        search: query, /*query.trim() ? query.trim() : ' ',*/
        tag,
        page,
        perPage: 12,
    }

    const response = await axios.get<NotesHttpResponse>(endPoint, { params, headers: { Authorization: `Bearer ${myKey}` } });
    
    return response.data;
}

//Отримати нотатку за ID
export const fetchNoteByID = async (id: string): Promise<Note> => {
    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const endPoint = `/notes/${id}`;

    const response = await axios.get<Note>(endPoint, { headers: { Authorization: `Bearer ${myKey}` } });
        
    return response.data;
}

//створити нотатку
export const createNote = async(note: NewNote): Promise<Note> => {
    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const endPoint = '/notes';

    const response = await axios.post<Note>(endPoint, note, { headers: { Authorization: `Bearer ${myKey}` } });
    
    return response.data;
}

//видалити нотатку
export const deleteNote = async(id: string):Promise<Note>  => {
    const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const endPoint = `/notes/${id}`;

    const response = await axios.delete<Note>(endPoint, { headers: { Authorization: `Bearer ${myKey}` } });

    return response.data;
}
