import Head from 'next/head'
import Link from 'next/link'
import CustomHeader from '../components/Header'
import Card from '../components/Card'

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Rafael de Mattos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex flex-col justify-center items-center flex-1'>

        <CustomHeader/>

        <div className="grid sm:grid-cols-1 lg:grid-cols-2">
          <Link href="/articles">
            <Card title="📰 Artigos" subtitle="Leia os artigos sobre DevOps que eu escrevo!"/>
          </Link>
          

          <a href="https://github.com/rafaelDev0ps">
            <Card title="👨‍💻 Projetos" subtitle="Veja o que ando aprontando nos meus projetos..."/>
          </a>

          <a href="https://www.linkedin.com/in/rafamttz">
          <Card title="😎 Sobre mim" subtitle="Saiba um pouco sobre a minha carreira!"/>
          </a>

          <a href="https://www.youtube.com/channel/UCdAg3KvCfl9FLyUOFAEGiOQ">
          <Card title="📺 Youtube" subtitle="Aprenda sobre DevOps e Linux no meu canal!"/>
          </a>
        </div>
      </main>

      <footer className='flex justify-center text-center items-center mt-5 py-6'>
        Feito com NextJS e Tailwind CSS por Rafael de Mattos
      </footer>
    </div>
  )
}
