import css from './NotesPage.module.css';
import { fetchNotes } from '@/lib/api';
import NotesPageClient from './Notes.client';
import { NoteTagType } from '@/types/note';

type NoteCategory = NoteTagType | 'All';

interface CategoryPageProps {
  params: Promise<{ slug: NoteCategory[] }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  const data = await fetchNotes('', 1, tag);
  return (
    <div className={css.app}>
      <NotesPageClient initialData={data} tag={tag} />
    </div>
  );
}
