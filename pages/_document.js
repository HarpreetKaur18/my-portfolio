import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/videos/favicon.ico" />
        {/* You can add more metadata here too */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
