import Link from "next/link";

export default function BlogHeader({}) {
  return (
    <>
        <Link href={'/'}>
          <p className="text-sm mb-3">Home</p>
        </Link>
        <h2 className="font-bold text-5xl py-[20px]">
          Artigos
        </h2>

        <p className="py-[12px]">
          <code>Artigos sobre cultura DevOps, tutoriais e ferramentas</code>
        </p>
    </>
  );
}