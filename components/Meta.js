import Head from "next/head";

export default function Meta({title}) {

  return (
    <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#46c757" />
        <meta name="description" content="Front-end Developer with React, I love working so much and I always look forward to gaining knowledge. I have worked on many projects with CSS frameworks, JS and React. " />
        <title>{title}</title>
      </Head>
  );
}

Meta.defaultProps = {
  title: 'Ahmed Ali | Front-end Developer'
}