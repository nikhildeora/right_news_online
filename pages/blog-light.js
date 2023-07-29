import BlogInnerSection from "../components/blog-light/blog-inner-section";

export default function BlogLight() {
  return <BlogInnerSection />;
}
export async function getServerSideProps() {
  return { props: { header: "four", footer: "four" } };
}
