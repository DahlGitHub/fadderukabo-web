import { Head, Html, Main, NextScript } from 'next/document';
import 'flowbite';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"  rel="stylesheet" />

      </Head>
      <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        <Main />
        <NextScript />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>


      </body>
    </Html>
  );
}