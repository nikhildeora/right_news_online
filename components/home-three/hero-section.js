/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import CountUp from 'react-countup';

export default function HeroSection() {
	return (
		<div className="fugu--hero-section newsbcg">
			<div id="fugu--counter"></div>
			<div className="container">
				<div className="row">
					<div className="col-lg-7 m-auto">
						<div className="fugu--hero-content">
							<h1 className="hero-heading wow fadeInUpX" data-wow-delay="0s">
								Welcome to Right News Online
								<span className="hero-small-heading">Your Source for Fastest News Updates!</span>
							</h1>
							<p className="wow fadeInUpX" data-wow-delay="0.10s">
								RightNewsOnline, we understand the value of being informed and staying up-to-date with
								the latest news and events from around the world. As a leading media agency, we are
								dedicated to delivering the fastest news updates to our subscribers, ensuring that you
								never miss out on any important information.
							</p>
							<div className="fugu--btn-wrap fugu--hero-btn wow fadeInUpX" data-wow-delay="0.20s">
								<Link href={'#'} legacyBehavior>
									<a className="fugu--btn bg-gray active">Check Membership Plans</a>
								</Link>
								<Link href={'#'} legacyBehavior>
									<a className="fugu--btn bg-gray">Download Latest Videos</a>
								</Link>
							</div>
							<div className="fugu--counter-wrap wow fadeInUpX" data-wow-delay="0.30s">
								<div className="fugu--counter-data text-center">
									<h2>
										<span data-percentage="45000" className="fugu--counter">
											<CountUp end={45000} />
										</span>
									</h2>
									<p>Total News Articles</p>
								</div>
								<div className="fugu--counter-data">
									<h2>
										<span data-percentage="500" className="fugu--counter">
											<CountUp end={500} />
										</span>
										<strong>+</strong>
									</h2>
									<p>Reporters</p>
								</div>
								<div className="fugu--counter-data">
									<h2>
										<span data-percentage="120" className="fugu--counter">
											<CountUp end={120} />
										</span>
										<strong>+</strong>
									</h2>
									<p>Clients</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
