import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { Button } from "~/components/ui/button";
import Layout from "~/components/layout";
import HomeServiceActions from "~/components/services/home-service-actions";
import NoServicesListed from "~/components/services/no-services-listed";
import { api } from "~/lib/api";
import { getServerAuthSession } from "~/server/auth";

// const ServiceViews = {};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user?.role === "ADMIN" && session?.user?.isNewUser) {
    return {
      redirect: {
        destination: "/create-service",
      },
      props: { session },
    };
  }

  return {
    props: { session },
  };
};

export default function Home() {
  const { data, isLoading } = api.service.getAll.useQuery();

  console.log({ data });
  const hasNoServices = !isLoading && !data?.length;

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full">
        <HomeServiceActions disableFilter={hasNoServices} />
        <div className="px-6 py-8">
          {hasNoServices ? <NoServicesListed /> : null}
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
