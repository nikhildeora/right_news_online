import InnerSection from "../components/users/inner-section";
import { createClient } from "next-sanity";
export default function ContactDark(props) {
	return <InnerSection users={props.users}/>;
}

export async function getStaticProps() {
		const client = createClient({
		  projectId: process.env.SANITY_PROJECT_ID,
		  dataset: process.env.SANITY_DATASET,
		  token: process.env.SANITY_TOKEN,
	  
		  useCdn: false, // set to `false` to bypass the edge cache
		  apiVersion: "1",
		});
		const users = await client.fetch('*[_type == "users" && _id in *[_type == "memberships"].user._ref]')
	return { props: { header: "three", footer: "three", users: users } }
}
