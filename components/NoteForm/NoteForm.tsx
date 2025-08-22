'use client';
import { useId } from 'react';
import type { NewNote } from '@/types/note';
import css from './NoteForm.module.css';
import { Field, Form, Formik, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must have at least 3 symbols.')
    .max(50, 'Title length more then 50 symbols.')
    .required('Title is required.'),
  content: Yup.string().max(500, 'Content is too long.'),
  tag: Yup.string()
    .oneOf(['Work', 'Todo', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required.'),
});

// використовуємо NewNote, оскільки ця форма для створення нової нотатки
const initialValues: NewNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteFormProps {
  onClose: () => void;
  /* для встановлення сторінки на 1, щоб одразу бачити додану нотатку:*/
  onSuccessAdd: (page: number) => void;
}

export default function NoteForm({ onClose, onSuccessAdd }: NoteFormProps) {
  const fieldId = useId();

  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess() {
      onSuccessAdd(1);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const handleSubmit = (
    values: NewNote,
    formikHelpers: FormikHelpers<NewNote>
  ) => {
    createTaskMutation.mutate(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId} - title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage component="span" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage component="span" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
