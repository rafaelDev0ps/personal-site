import * as prismicH from '@prismicio/helpers'
import { createClient } from '../prismicio'
import { PrismicRichText } from "@prismicio/react";

export default function Post({ page }) {
    console.log(page)
    return (
      <>
        <h2 className="font-bold text-5xl pl-[12px] mb-[12px]">
            <PrismicRichText className="text-2xl mb-[16px] font-medium" field={page.data.title} />
        </h2>

        <p className="p-[12px] mb-[24px]">
            <PrismicRichText className="text-2xl mb-[16px] font-medium" field={page.data.slug} />
        </p>
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