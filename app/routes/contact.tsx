// Import internal dependencies
import Layout from "@/layouts/layout";
import StoreProvider from "@/store/storeProvider";
import ContactCard from "@/components/contact/contactCard";

export default function Contact() {
  return (
    <Layout>
      <StoreProvider>
        <ContactCard />
      </StoreProvider>
    </Layout>
  );
}
