import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
          />
          <meta name="theme-color" content="#fff" />
          <meta name="google" value="notranslate" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
