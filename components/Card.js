export default function Card({ title, subtitle }) {
    return (
      <section className="border border-slate-200 rounded-xl p-[24px] m-[16px] hover:text-blue-500 hover:border-blue-500 transition-colors">
        <h3 className="text-2xl mb-[16px] font-medium">{title}</h3>
        <p className="text-lg">{subtitle}</p>
      </section>
    );
  }