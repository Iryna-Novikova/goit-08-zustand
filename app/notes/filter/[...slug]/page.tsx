import css from './NotesPage.module.css';
import { fetchNotes } from '@/lib/api';
import NotesPageClient from './Notes.client';
import { NoteTagType } from '@/types/note';
import { Metadata } from 'next';

type NoteCategory = NoteTagType | 'All';

interface CategoryPageProps {
  params: Promise<{ slug: NoteCategory[] }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Notes category: ${slug[0]}`,
    description: 'Notes by category',
    openGraph: {
      title: `Notes category: ${slug[0]}`,
      description: 'Notes by category',
      url: `https://goit-08-zustand.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notes category: ${slug[0]}`,
        },
      ],
      type: 'website',
    },
  };
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
