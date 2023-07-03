/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function BreadcrumbSection() {
	return (
		<div className="fugu--breadcrumbs-section">
			<div className="fugu--breadcrumbs-data">
				<h1>NFTs & Japanese Culture: a rising, diverse community</h1>
				<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
					<div>
						<p>
							The Japanese NFT community is in its early days. In this article, we’ll provide an overview of the
							community from the standpoint of cultural exports, namely the mangaverse and gaming.
						</p>
						<div className="fugu--blog-meta">
							<ul>
								<li>
									<Link href={"#"}>
										<img src="assets/images/svg2/calendar.svg" alt="" /> Art & Analusis
									</Link>
								</li>
								<li>
									<Link href={"#"}>
										<img src="assets/images/svg2/clock.svg" alt="" /> July 18, 2022
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div >
						<button style={{color:"white",padding:"12px 28px",backgroundColor:"red",cursor:"pointer",fontWeight:"bold",borderRadius:"10px",fontSize:"23px"}}>&#8377; 300</button>
					</div>
				</div>
			</div>
		</div>
	);
}
