import { useEffect, useState } from 'react';

export default function Preloader() {
	const [showLoader, setShowLoader] = useState(true);
	const [isLoded, setIsLoded] = useState(null);

	useEffect(() => {
		window.addEventListener('load', () => {
			setIsLoded('loaded');
		});

		const timer = setTimeout(() => {
			setShowLoader(false);
		}, 700);

		return () => clearTimeout(timer);
	});
	return (
		showLoader && (
			<div className={`fugu-preloader ${isLoded}`}>
				<div className="fugu-title">
					<img src="https://rightnewsonline.com/wp-content/uploads/2023/03/download.png" alt="" />
				</div>
			</div>
		)
	);
}
