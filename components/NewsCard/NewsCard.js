import React, { useEffect } from 'react';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from 'next-sanity';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { RiDownloadCloud2Line } from 'react-icons/ri';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import { brightness, opacity } from '@cloudinary/url-gen/actions/adjust';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { text, image } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import axios from 'axios';

const NewsCard = (props) => {
	console.log(props);
	const [video, setVideo] = useState(false);
	const [linkForDownload, setLinkForDownload] = useState('');
	const [readyDownload, setReadyDownload] = useState(false);
	const [state, setState] = useState(true);
	const [rdstate, setRdState] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (video) {
			setTimeout(() => {
				setVideo(!video);
			}, 7000);
		}
	}, [video]);

	let Video = props.news.video
		? props.news.video
		: {
				url: 'https://cdn.sanity.io/files/kbgpbmgs/production/4ab319d2c65d53b84ae81fa5d14a3035aba82b6f.mp4',
				mimeType: 'video/mp4',
		  };
	console.log(Video);

	let Date = props.news.createdAt.slice(0, 10);

	let classValue = `collection-grid-item wow fadeInUpX col-lg-4 col-sm-6  ${props.news.newsCategory}`;
	//
	//watermark code
	const cloudinary = new Cloudinary({
		cloud: {
			cloudName: 'dmdnkgldu',
			apiKey: '824834376614351',
			apiSecret: '6-p_NhIRezrfvdaVYdul8v_gpn0',
		},
	});

	const ReadyVideoForDownload = async () => {
		if (localStorage.getItem('currentUser')) {
			let link = Video.url
				? Video.url
				: 'https://cdn.sanity.io/files/kbgpbmgs/production/4ab319d2c65d53b84ae81fa5d14a3035aba82b6f.mp4';
			setRdState(!state);
			const formData = new FormData();
			formData.append('file', link);
			formData.append('upload_preset', 'awesome_preset');
			console.log('form', formData);
			let data = await axios.post(`https://api.cloudinary.com/v1_1/dmdnkgldu/video/upload`, formData);
			console.log('res_data', data);
			let myVideo = cloudinary.video(data.data.public_id);
			console.log('myvideo', myVideo);

			myVideo
				.overlay(
					source(
						image('Newfitnexylogo_nl9uuy').transformation(
							new Transformation()
								.resize(scale().width(0.5))
								.adjust(opacity(60))
								.adjust(brightness().level(50))
						)
					).position(new Position().gravity(compass('north_east')).offsetY(20))
				)
				.format('mp4');
			console.log('my video after adding logo', myVideo);
			let myVideoURL = myVideo.toURL();
			console.log('myURL', myVideoURL);
			setRdState(!state);
			setReadyDownload(!readyDownload);
			setLinkForDownload(myVideoURL);
		} else {
			Swal.fire({
				title: '🔒 LOGIN REQUIRED🔒',
				text: 'To access our extensive collection of videos, we kindly ask you to log in. Logging in ensures a seamless and secure downloading experience. Your privacy matters to us, and by logging in, you can enjoy our content while keeping your data safe. Thank you for your cooperation!',
				icon: 'info',
				showCancelButton: false,
				confirmButtonColor: '#db0303',
				cancelButtonColor: '#757575',
				confirmButtonText: 'LOGIN / SIGNUP',
				reverseButtons: false,
			}).then((result) => {
				if (result.isConfirmed) {
					router.push('/signup');
				}
			});
		}
	};

	const DownloadVideo = () => {
		setState(!state);
		let url = linkForDownload;
		fetch(url)
			.then(async (res) => await res.blob())
			.then((file) => {
				let tempUrl = URL.createObjectURL(file);
				const aTag = document.createElement('a');
				aTag.href = tempUrl;
				aTag.download = url.replace(/^.*[\\\/]/, '');
				document.body.appendChild(aTag);
				aTag.click();
				URL.revokeObjectURL(tempUrl);
				aTag.remove();
			})
			.then(() => setState((prev) => !prev))
			.catch((err) => {
				console.log('error', err);
				Swal.fire({
					title: 'Download Failed',
					text: 'Due to some technical reason download failed',
					icon: 'error',
					confirmButtonColor: '#26215c',
					confirmButtonText: 'Close',
					reverseButtons: true,
				});
				setState(!state);
			});
	};

	function handleClick() {
		setVideo(!video);
	}

	return (
		<div className="fugu--blog-filtering row ">
			<div className="col-12">
				<div className="fugu--portfolio-wrap row" id="fugu--two-column">
					<div className={classValue} data-wow-delay="0s">
						<div className="fugu--blog-wrap">
							<div>
								{video ? (
									<div className="fugu--blog-thumb">
										<VideoPlayer handleClick={handleClick} Video={Video}></VideoPlayer>
									</div>
								) : (
									<div className="fugu--blog-thumb">
										<img src={props.news.newsImage} alt="News Image" onClick={handleClick} />

										<div className="video-badge">
											<AiOutlinePlayCircle className="redAura" />
										</div>
									</div>
								)}
							</div>
							<div className="fugu--blog-content">
								<div className="fugu--blog-date">
									<ul>
										<li>
											<Link href={`/single-blog-dark/${props.news.slug}`}>
												<img src="/images/svg2/calendar.svg" alt="" />
												{Date}
											</Link>
										</li>

										<li>
											<Link href={`/single-blog-dark/${props.news.slug}`}>
												<img src="/images/svg2/clock.svg" alt="" />5 min read
											</Link>
										</li>
										<li>
											<Link href={`/single-blog-dark/${props.news.slug}`}>
												<img src="/images/svg2/clock.svg" alt="" /> {props.news.newsCategory}
											</Link>
										</li>
									</ul>
								</div>
								<div
									className="fugu--blog-title"
									style={{
										marginBottom: '12px',
									}}
								>
									{/* <Link href="single-blog-dark"> */}
									<Link
										href={`/single-blog-dark/${props.news.slug}`}
										className="elipText"
										style={{
											color: '#ffffff',
											textDecoration: 'none',
											transition: 'text-decoration 0.3s',
											cursor: 'pointer',
											fontSize: '18px',
											webkitLineClamp: 3,
											fontWeight: '600',
											marginBottom: '10px',
											lineHeight: '21px',
										}}
										onMouseEnter={(e) => {
											e.target.style.textDecoration = 'underline';
										}}
										onMouseLeave={(e) => {
											e.target.style.textDecoration = 'none';
										}}
									>
										{props.news.newsTitle}
									</Link>
									{/* </Link> */}
								</div>
								<p
									style={{
										color: '#ffffff',
										textDecoration: 'none',
										transition: 'text-decoration 0.3s',
										cursor: 'pointer',
										fontSize: '14px',
										fontWeight: '400',
										marginBottom: '10px',
									}}
								>
									{props.news.newsShortDescription}
								</p>
								{/* <div
                  className="fugu--btn fugu--menu-btn1 downloadButton"
                  onClick={handleDownload}
                >
                  Download Video
                </div> */}
								{readyDownload ? (
									<>
										{state ? (
											<button
												onClick={DownloadVideo}
												className="fugu--btn fugu--menu-btn1 downloadButton w-100"
											>
												Download
											</button>
										) : (
											<button
												className="fugu--btn fugu--menu-btn1 downloadButton"
												style={{ width: '192px', height: '45px' }}
											>
												<img
													className="loading_icon"
													src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
													alt="Loading..."
													style={{
														width: '32px',
														height: '32px',
														marginTop: '-4px',
													}}
												/>
											</button>
										)}
									</>
								) : (
									<>
										{rdstate ? (
											<button
												className="fugu--btn fugu--menu-btn1 downloadButton"
												onClick={ReadyVideoForDownload}
											>
												<RiDownloadCloud2Line className="download-icon" />
												Download Video
											</button>
										) : (
											<button
												className="fugu--btn fugu--menu-btn1 downloadButton"
												style={{ width: '192px', height: '45px' }}
											>
												<img
													className="loading_icon"
													src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
													alt="Loading..."
													style={{
														width: '32px',
														height: '32px',
														marginTop: '-4px',
													}}
												/>
											</button>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewsCard;

//Function for plan buying and login check

// const handleDownload = async () => {
//   if (localStorage.getItem("currentUser")) {
//     const client = createClient({
//       projectId: process.env.SANITY_PROJECT_ID,
//       dataset: process.env.SANITY_DATASET,
//       token: process.env.SANITY_TOKEN,

//       useCdn: false, // set to `false` to bypass the edge cache
//       apiVersion: "1",
//     });
//     const link =
//       await client.fetch(`*[_type == "news" && _id == "${props.news.id}"][0] {
//       title,
//       "link": newsVideo.asset->url
//     }`);
//     window.location.href = `${link.link}?dl=`;
//   } else {
//     Swal.fire({
//       title: "Can't find user",
//       text: "Please Login / Signup to proceed further!",
//       icon: "info",
//       showCancelButton: true,
//       confirmButtonColor: "#26215c",
//       cancelButtonColor: "#757575",
//       confirmButtonText: "Login / Signup",
//       reverseButtons: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         router.push("/signup");
//       }
//     });
//   }
// };
