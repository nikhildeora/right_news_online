import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import Layout from "../components/layout";

import Head from "next/head";
import "react-modal-video/css/modal-video.min.css";
import "swiper/css";
import "swiper/css/effect-cards";
import Preloader from "../components/common/preloader/preloader";
import ScrollTop from "../components/common/scroll-top";
import "../styles/css/app.css";
import "../styles/css/main.css";
import AuthContextProvider from "../context/auth_context";

function MyApp({ Component, pageProps }) {
	return (
		<>
		    <AuthContextProvider>
			<Head>
				{/* common title */}
				<title>fugu</title>
			</Head>

			<Layout>
				<Component {...pageProps} />
			</Layout>

			<ScrollTop />
			<Preloader />
			</AuthContextProvider>
		</>
	);
}

export default MyApp;
