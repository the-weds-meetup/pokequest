import Head from 'next/head';
import React from 'react';

interface Props {
  title?: string;
}

const SEO: React.FC<Props> = (props) => {
  const { title } = props;
  const siteTitle = 'PokeQuest';

  return (
    <Head>
      <title>
        {title} | {siteTitle}
      </title>
      <meta property="og:title" content={`${title} | ${siteTitle}`} />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:type" content="website" />
    </Head>
  )
}

export default SEO;
