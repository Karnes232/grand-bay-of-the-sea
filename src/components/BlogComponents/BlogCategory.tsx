import React from "react"
import Link from "next/link"
import Image from "next/image"

const BlogCategory = ({ post }: { post: any }) => {
  return (
    <Link
      href={`/blog/${post.fields.slug}`}
      className="no-underline"
      aria-label={post.fields.blogCategory}
    >
      <div className="w-80 h-60 mx-auto my-5 rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-full w-full">
          <Image
            src={`https:${post.fields.blogImage.fields.file.url}`}
            alt={post.fields.title}
            fill
            className="object-cover"
          />
          <h1
            translate="no"
            className="relative inline-block text-center text-white z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-crimson tracking-widest text-3xl md:text-4xl mx-2 text-balance"
          >
            {post.fields.blogCategory}
          </h1>
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </Link>
  )
}

export default BlogCategory

//<Image src={`https:${post.fields.blogImage.fields.file.url}`} alt={post.fields.title} width={post.fields.blogImage.fields.file.details.image.width} height={post.fields.blogImage.fields.file.details.image.height} />
