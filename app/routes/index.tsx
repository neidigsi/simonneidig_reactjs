// Import internal dependencies
import Layout from "@/layouts/layout";
import StoreProvider from "@/store/storeProvider";
import AboutCard from "@/components/about/aboutCard";
import "@/assets/scss/main.css";

export default function Index() {
  return (
    <Layout>
      <StoreProvider>
        <AboutCard />
      </StoreProvider>
    </Layout>
  );
}
