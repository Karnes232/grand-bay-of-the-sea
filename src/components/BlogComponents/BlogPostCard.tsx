import React from "react"
import Link from "next/link"
import Image from "next/image"

const BlogPostCard = ({ blog }: { blog: any }) => {
  return (
    <Link
      href={`/blog/${blog.fields.blogCategory.fields.slug}/${blog.fields.slug}`}
      className="no-underline block"
      aria-label={blog.fields.title}
    >
      <div className="bg-white w-80 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={`https:${blog.fields.backgroundImages[0].fields.file.url}`}
            alt={blog.fields.backgroundImages[0].fields.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
            {blog.fields.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {blog.fields.description}
          </p>
          <div className="mt-4 text-sm text-blue-600 font-semibold">
            Read More →
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostCard
