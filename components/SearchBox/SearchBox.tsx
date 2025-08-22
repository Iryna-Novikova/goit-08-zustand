'use client';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  inputValue: string;
  onChange: (newSearchQuery: string) => void;
}

export default function SearchBox({ inputValue, onChange }: SearchBoxProps) {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    onChange(ev.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleChange}
    />
  );
}
