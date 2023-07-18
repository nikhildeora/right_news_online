import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
export default function BreadcrumbOne({ title }) {
	return (
		<div className="fugu-breadcrumb-section">
			<div className="container">
				<div className="breadcrumbs text-white">
					<h1 className="text-white">{title}</h1>
					<h2>Strategy pricing plans that we offer to our clients</h2>
				</div>
			</div>
			<div className="fugu-shape8">
				<img src="/images/shape/shape7.png" alt="" />
			</div>
			<div className="fugu-shape9">
				<img src="/images/shape/shape8.png" alt="" />
			</div>
		</div>
	);
}
