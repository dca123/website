import Head from "next/head";

export const Title = ({ title }: { title?: string }) => {
  return (
    <Head>
      <title>{title && `${title} | `} Devinda Senanayake </title>
    </Head>
  );
};
