// Import internal dependencies
import Layout from "@/layouts/layout";
import StoreProvider from "@/store/storeProvider";
import ResumeCard from "@/components/resume/resumeCard";

export default function Resume() {
  return (
    <Layout>
      <StoreProvider>
        <ResumeCard />
      </StoreProvider>
    </Layout>
  );
}
