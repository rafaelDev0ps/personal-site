import BlogHeader from '../../components/BlogHeader';
import { createClient } from '../../prismicio'
import PostSlug from '../../components/PostSlug'

export default function Articles({ page }) {
  return (
    <div className='flex flex-col min-h-screen lg:px-40 max-[425px]:px-4'>
      <BlogHeader/>
      <main className='flex flex-col justify-right items-right mt-2 flex-1'>
        <div className="">
            <ul className='list-none'>
                {page.results.map(post => (
                <PostSlug key={post.id} post={post}/>
                ))}
            </ul>
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