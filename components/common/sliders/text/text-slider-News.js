/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Slider from 'react-slick';

export default function TextSliderNews(props) {
	const news = props.newsdata;
	const settings = {
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 10000,
		cssEase: 'linear',
		pauseOnHover: true,
		adaptiveHeight: true,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<div className="fugu--text-slider-section">
			<div className="fugu--text-slider">
				<Slider {...settings}>
					{news.map((news, index) => {
						return (
							<div className="fugu--text-slider-data" key={index}>
								<div className="fugu--text-slider-icon">
									{<img src="/images/all-img/v3/daimond.png" alt="" />}
								</div>

								<h3 style={{ fontSize: '32px' }}>- EXCLUSIVE LIVE VIDEO -</h3>
							</div>
						);
					})}
				</Slider>
			</div>
		</div>
	);
}
