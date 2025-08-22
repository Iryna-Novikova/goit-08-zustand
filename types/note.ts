export type NoteTagType = 'Work' | 'Todo' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
    id: string; 
    title: string;
    content: string;
    tag: NoteTagType;
    createdAt: string;
    updatedAt: string;
}

export interface NewNote {
    title: string;
    content: string;
    tag: NoteTagType;
}