"use client";

// Import internal dependencies
import Layout from "@/app/layout";
import StoreProvider from "@/app/storeProvider";
import AboutCard from "@/components/about/aboutCard";

export default function Index() {
  return (
    <Layout>
      <StoreProvider>
        <AboutCard />
      </StoreProvider>
    </Layout>
  );
}
