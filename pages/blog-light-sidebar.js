import BlogInnerSection from "../components/blog-light-sidebar/blog-inner-section";

export default function BlogLightSidebar() {
  return <BlogInnerSection theme="light" />;
}

export async function getServerSideProps() {
  return { props: { header: "four", footer: "four" } };
}
