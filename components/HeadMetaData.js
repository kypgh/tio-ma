import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const HeadMetaData = ({ meta, children }) => {
  const { title, description } = meta;

  const router = useRouter();
  const siteUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}${
    router.asPath || ""
  }`;

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <title>{title || "TIOMarkets"}</title>
        <meta name="title" content={title || ""} />
        <meta name="description" content={description || ""} />
        <meta name="relation" content={router.asPath || ""} />
        <meta name="source" content={siteUrl} />
      </Head>
      {children}
    </>
  );
};

export default HeadMetaData;
