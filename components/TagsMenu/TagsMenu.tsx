'use client';
import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { NoteTagType } from '@/types/note';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuSwitcher = () => setIsOpen(!isOpen);
  const tags: NoteTagType[] = [
    'Work',
    'Todo',
    'Personal',
    'Meeting',
    'Shopping',
  ];

  return (
    <div className={css.menuContainer}>
      <button onClick={menuSwitcher} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          <li key="All" className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={menuSwitcher}
            >
              All Notes
            </Link>
          </li>

          {tags.map(tag => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={menuSwitcher}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
