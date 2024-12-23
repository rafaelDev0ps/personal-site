import Image from 'next/image';

export default function CustomHeader({ children }) {
  return (
    <>
        <img 
          src="/IconSquare.jpg" 
          alt="Rafael de Mattos logo" 
          className="rounded-full mt-15 mb-3"
          width={300}
          height={300}
        />

        <h2 className="font-bold text-5xl p-[12px] m-[12px] text-center">
          Rafael de Mattos
        </h2>

        <p className="p-[12px] mb-[24px]">
          <code>DevOps engineer engineering things that need (or not) to be engineered</code>
        </p>
    </>
  );
}