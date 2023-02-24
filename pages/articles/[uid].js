import * as prismicH from '@prismicio/helpers'
import { createClient } from '../../prismicio'
import { PrismicRichText } from "@prismicio/react";
import Link from 'next/link';

export default function Post({ page }) {
    return (
      <>
        <div className="px-40 mx-40 ">
          { page && (
            <>
              <div className='text-sm mb-4'>
                <Link href={'/articles'}>
                  <p>Voltar</p>
                </Link>
              </div>
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
                    heading2: ({ children }) => <h2 className="mt-12 mb-3 font-normal text-3xl">{children}</h2>,
                    heading3: ({ children }) => <h3 className="mt-5 mb-3 font-normal">{children}</h3>,
                    paragraph: ({ children }) => <p className="my-7 font-normal">{children}</p>, 
                    image: ({ children }) => {children},
                    preformatted: ({ children }) => <pre className='text-sm w-full mb-10 max-h-[500px] overflow-auto bg-slate-200 p-2'>{children}</pre>,
                    hyperlink: ({ children }) => <a className='links'>{children}</a>,
                    strong: ({ children }) => <strong className='bold-font'>{children}</strong>,
                    listItem: ({ children }) => <li className='list-disc ml-10'>{children}</li>,
                    
                  }}
                />
              </div>
            </>
          )}
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