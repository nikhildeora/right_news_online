/* eslint-disable @next/next/no-img-element */
import React from "react";
import PortableText from "react-portable-text"
import BlockquoteSection from "./blockquote-section";
import CommentRespondSection from "./comment-respond-section";
import CommentSection from "./comment-section";
import PostNavigation from "./post-navigation";
import TagSection from "./tag-section";

export default function SingleBlogPost(props) {
	return (
		<>{props.news&& <div className="fugu--single-blog-section">
			<img className="fugu--single-thumb" src={props.news.newsImage} alt="" />
			<PortableText content={props.news.newsLongDescription&&props.news.newsLongDescription} />
			<BlockquoteSection />
			<TagSection />
			<PostNavigation />
			<CommentSection />
			<CommentRespondSection />
		</div>
}
</>
	);
}
