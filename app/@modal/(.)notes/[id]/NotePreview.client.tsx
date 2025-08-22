'use client';
import { useQuery } from '@tanstack/react-query';
import css from './NotePreview.module.css';
import { fetchNoteByID } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();
  const onClose = () => router.back();

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
        <Modal onClose={onClose}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <button onClick={onClose} className={css.backBtn}>
              Back
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
