// Import internal dependencies
import Layout from "@/app/layout";
import StoreProvider from "@/app/storeProvider";
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
