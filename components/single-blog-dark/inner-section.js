/* eslint-disable @next/next/no-img-element */
import BreadcrumbSection from './breadcrumb-section';
import SingleBlogPost from './single-blog-post';

export default function InnerSection(props) {
	return (
		<div className="fugu--inner-section dark-version fugu--single-blog">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<BreadcrumbSection news={props.news} />
						<SingleBlogPost news={props.news} />
					</div>
				</div>
			</div>
			<div className="fugu--blog-shape1">
				<img src="assets/images/all-img/v3/shape2.png" alt="" />
			</div>
			<div className="fugu--blog-shape3">
				<img src="assets/images/all-img/blog2/shape.png" alt="" />
			</div>
		</div>
	);
}
