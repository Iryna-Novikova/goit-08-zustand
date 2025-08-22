'use client';

interface ErrorNoteProps {
  error: Error;
}

export default function Error({ error }: ErrorNoteProps) {
  return <p>Could not fetch note details. {error.message}</p>;
}
