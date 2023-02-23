import * as prismicH from '@prismicio/helpers'
import { createClient } from '../prismicio'
import { PrismicRichText } from "@prismicio/react";

export default function Post({ page }) {
    console.log(page)
    return (
      <>
        <div className="px-40 mx-40 ">
            <PrismicRichText 
                field={page.data.title}
                components={{
                    paragraph: ({ children }) => <h2 className="font-bold text-[32px] mb-16">{children}</h2>
                }}
            />
            <div className='text-xl'>
                <PrismicRichText 
                    field={page.data.content} 
                    components={{
                        paragraph: ({ children }) => <p className="my-10 font-light">{children}</p>, 
                        image: ({ children }) => {children},
                        preformatted: ({ children }) => <pre className='text-sm w-full mb-10 max-h-[500px] overflow-auto bg-slate-200 p-2'>{children}</pre>,
                    }}
                />
            </div>
        </div>
        
      </>
    );
}

// Fetch content from prismic
export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID('post', params.uid)

  return {
    props: { page },
  }
}

// Define Paths
export async function getStaticPaths() {
  const client = createClient()

  const pages = await client.getAllByType('post')

  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: true,
  }
}