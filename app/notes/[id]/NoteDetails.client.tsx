'use client';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import css from './NoteDetails.module.css';
import { fetchNoteByID } from '@/lib/api';

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteByID(id),
    refetchOnMount: false,
  });

  /* повідомлення про завантаження */
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  return (
    <div className={css.container}>
      {/* повідомлення про помилку */}
      {(isError || !note) && <p>Something went wrong.</p>}
      {/* в разі успішного запиту */}
      {isSuccess && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      )}
    </div>
  );
}
