import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export default function PostSlug({ post }) {
    return (
        <Link href={'/articles/'+post.uid}>
            <section className="border border-slate-200 rounded-xl p-[24px] m-[16px] hover:text-blue-500 hover:border-blue-500 transition-colors">
                <PrismicRichText 
                    field={post.data.title}
                    components={{
                        paragraph: ({ children }) => <p className="text-2xl mb-[16px] font-medium">{children}</p>
                    }}
                />
                <PrismicRichText 
                    field={post.data.slug}
                    components={{
                        paragraph: ({ children }) => <p className="text-lg">{children}</p>
                    }}
                />
            </section>
        </Link>
    );
}