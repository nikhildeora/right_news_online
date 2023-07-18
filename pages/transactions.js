import InnerSection from "../components/transactions/inner-section";
import { createClient } from "next-sanity";
export default function ContactDark(props) {
	return <InnerSection transactions={props.transactions}/>;
}

export async function getStaticProps() {
		const client = createClient({
		  projectId: process.env.SANITY_PROJECT_ID,
		  dataset: process.env.SANITY_DATASET,
		  token: process.env.SANITY_TOKEN,
	  
		  useCdn: false, // set to `false` to bypass the edge cache
		  apiVersion: "1",
		});
		const transactions = await client.fetch(`*[_type == "orders"]{
			...,
			"newsDetails" : news->
		  }`)
	return { props: { header: "three", footer: "three", transactions: transactions } }
}
