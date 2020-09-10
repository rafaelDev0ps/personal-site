import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Rafael de Mattos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <img src="/Icone Square.png" alt="Rafael de Mattos logo" className="author-logo"/>

        <h2 className="title">
          Rafael de Mattos
        </h2>

        <p className="description">
          <code>Software Developer</code>
        </p>

        <div className="grid">
          <a href="https://medium.com/@ramattos16" className="card">
            <h3>📰 Artigos</h3>
            <p>Leia meus artigos que publico no Medium!</p>
          </a>

          <a href="https://github.com/rafamttz" className="card">
            <h3>👨‍💻 Projetos</h3>
            <p>Veja que eu ando aprontando nos meus projetos ...</p>
          </a>

          <a href="https://www.instagram.com/rafalivecoding" className="card">
            <h3>📱 Instagram</h3>
            <p>Veja o conteúdo que eu compartilho com a comunidade!</p>
          </a>

          <a href="https://www.linkedin.com/in/rafamttz" className="card">
            <h3>😎 Sobre mim</h3>
            <p>
              Saiba um pouco sobre a minha pessoa!
            </p>
          </a>
        </div>
      </main>

      <footer>
        Feito por Rafael de Mattos
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .author-logo {
          width: 22.5%;
          height: 22.5%;
          border-radius: 50%;
          margin-bottom: 2.5%;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3.5rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 1.5rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
