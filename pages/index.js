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
            <Card title="📰 Articles" subtitle="Read the content I share with the community!"/>
          </Link>
          

          <a href="https://github.com/rafaelDev0ps">
            <Card title="👨‍💻 Projects" subtitle="Check what I'm hacking recently..."/>
          </a>

          <a href="https://www.linkedin.com/in/rafamttz">
          <Card title="😎 About me" subtitle="Wanna know more about my carrer? Ok, click here!"/>
          </a>

          <a href="https://www.youtube.com/channel/UCdAg3KvCfl9FLyUOFAEGiOQ">
          <Card title="📺 Youtube" subtitle="Learn about DevOps and Linux on my channel!"/>
          </a>
        </div>
      </main>

      <footer className='flex justify-center text-center items-center mt-5 py-6'>
        Built with NextJS and Tailwind CSS by me ;P
      </footer>
    </div>
  )
}
