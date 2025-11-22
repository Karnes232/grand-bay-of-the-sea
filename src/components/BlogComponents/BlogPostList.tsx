import React from "react"
import BlogPostCard from "./BlogPostCard"

const BlogPostList = ({
  blogPosts,
  locale,
}: {
  blogPosts: any[]
  locale: string
}) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly gap-10 max-w-5xl xl:max-w-6xl mx-auto">
      {blogPosts &&
        blogPosts.map((blog, index) => {
          return <BlogPostCard blog={blog} key={index} locale={locale} />
        })}
    </div>
  )
}

export default BlogPostList
