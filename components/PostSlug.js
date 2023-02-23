import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export default function PostSlug({ post }) {
    return (
        <Link href={'/post/'+post.uid}>
            <section className="border border-slate-200 rounded-xl p-[24px] m-[16px] hover:text-blue-500 hover:border-blue-500 transition-colors">
                <PrismicRichText className="text-2xl mb-[16px] font-medium" field={post.data.title} />
                <PrismicRichText className="text-lg" field={post.data.slug} />
            </section>
        </Link>
    );
}