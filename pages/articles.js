import Link from 'next/link';
import BlogHeader from '../components/BlogHeader';

export default function Articles({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <BlogHeader/>
      <main className='container mx-auto flex-1'>{children}</main>
      <footer className='bg-fuchsia-100 mt-8 py-4'>
        <div className='container mx-auto flex justify-center'>
          &copy; 2023 Rafael de Mattos
        </div>
      </footer>
    </div>
  );
}
