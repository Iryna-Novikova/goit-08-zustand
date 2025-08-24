import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Not found',
  description: `Such page doesn't exists`,
  openGraph: {
    title: 'Note Hub',
    description: 'Application for work with Notes.',
    url: 'https://goit-08-zustand.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Page not found',
      },
    ],
    type: 'website',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
