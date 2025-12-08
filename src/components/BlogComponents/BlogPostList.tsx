"use client"

import React, { useState, useMemo, useEffect } from "react"
import { useTranslations } from "next-intl"
import BlogPostCard from "./BlogPostCard"

const ITEMS_PER_PAGE = 6

const BlogPostList = ({
  blogPosts,
  locale,
}: {
  blogPosts: any[]
  locale: string
}) => {
  const t = useTranslations("Blog")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredBlogPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return blogPosts
    }

    const query = searchQuery.toLowerCase().trim()
    return blogPosts.filter(blog => {
      const title = blog.title[locale]?.toLowerCase() || ""
      const description = blog.description[locale]?.toLowerCase() || ""
      return title.includes(query) || description.includes(query)
    })
  }, [blogPosts, searchQuery, locale])

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogPosts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedBlogPosts = filteredBlogPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="relative lg:mx-10 xl:mx-5">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          <svg
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {(searchQuery || totalPages > 1) && (
          <p className="mt-2 text-sm text-gray-600 lg:mx-10 xl:mx-5">
            {filteredBlogPosts.length === 0
              ? t("noBlogPostsFound")
              : `${filteredBlogPosts.length} ${filteredBlogPosts.length === 1 ? t("blogPostsFound") : t("blogPostsFoundPlural")}${totalPages > 1 ? ` ${t("showing")} ${startIndex + 1}-${Math.min(endIndex, filteredBlogPosts.length)} ${t("of")} ${filteredBlogPosts.length}` : ""}`}
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-evenly gap-10">
        {paginatedBlogPosts && paginatedBlogPosts.length > 0 ? (
          paginatedBlogPosts.map((blog, index) => {
            return <BlogPostCard blog={blog} key={index} locale={locale} />
          })
        ) : searchQuery ? (
          <div className="w-full text-center py-12">
            <p className="text-gray-500 text-lg">{t("noMatch")}</p>
          </div>
        ) : null}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2 lg:mx-10 xl:mx-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200"
            aria-label={t("previousPage")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {getPageNumbers().map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-4 py-2 text-gray-500"
                  >
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? "bg-blue-500 text-white border-2 border-blue-500"
                      : "text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-500"
                  }`}
                  aria-label={`${t("goToPage")} ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200"
            aria-label={t("nextPage")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogPostList
