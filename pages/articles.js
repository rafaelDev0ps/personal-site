import BlogHeader from '../components/BlogHeader';
import { createClient } from '../prismicio'
import PostSlug from '../components/PostSlug'

export default function Articles({ page }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <BlogHeader/>
      <main className='flex flex-col justify-center items-center flex-1'>
        <div className="grid grid-cols-3">
            {page.results.map(post => (
              <PostSlug key={post.id} post={post}/>
            ))}
          </div>
      </main>
    </div>
  );
}


export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByType('post')

  return {
    props: { page }, // Will be passed to the page component as props
  }
}