import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import { toDate } from "../utils/date";

export default function PostSlug({ post }) {
    return (
        <li>
            <Link href={'/articles/'+post.uid}>
                <section className="border-b border-slate-200 py-[16px] my-[16px] hover:text-blue-500 hover:border-blue-500 transition-colors">
                    <PrismicRichText 
                        field={post.data.title}
                        components={{
                            paragraph: ({ children }) => <h4 className="text-2xl max-[425px]:text-lg font-medium">{children}</h4>
                        }}
                    />
                    <p className="text-sm max-[425px]:text-xs mb-2 text-slate-300">Editado pela última vez em {toDate(post.last_publication_date)}</p>
                    <PrismicRichText 
                        field={post.data.slug}
                        components={{
                            paragraph: ({ children }) => <p className="text-lg max-[425px]:text-sm">{children}</p>
                        }}
                    />
                </section>
            </Link>
        </li>
    );
}