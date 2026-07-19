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
    <div className="mx-auto w-full max-w-[1080px]">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-[14px] border border-line bg-card px-5 py-3.5 pr-12 text-fg transition-all duration-200 placeholder:text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          <svg
            className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-faint"
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
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line pb-[18px]">
            <span className="font-display text-[1.3rem] font-bold tracking-[-0.02em] text-fg">
              {filteredBlogPosts.length === 0
                ? t("noBlogPostsFound")
                : `${filteredBlogPosts.length} ${filteredBlogPosts.length === 1 ? t("blogPostsFound") : t("blogPostsFoundPlural")}`}
            </span>
            {totalPages > 1 && (
              <span className="text-sm text-faint">
                {`${t("showing")} ${startIndex + 1}-${Math.min(endIndex, filteredBlogPosts.length)} ${t("of")} ${filteredBlogPosts.length}`}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[22px]">
        {paginatedBlogPosts && paginatedBlogPosts.length > 0 ? (
          paginatedBlogPosts.map((blog, index) => {
            return <BlogPostCard blog={blog} key={index} locale={locale} />
          })
        ) : searchQuery ? (
          <div className="w-full py-12 text-center">
            <p className="text-lg text-faint">{t("noMatch")}</p>
          </div>
        ) : null}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-11 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-[44px] min-w-[44px] items-center justify-center rounded-[11px] border-[1.5px] border-line-strong bg-card px-3.5 text-muted transition-all duration-200 hover:border-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-strong"
            aria-label={t("previousPage")}
          >
            <svg
              className="h-5 w-5"
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
                    className="flex h-[44px] min-w-[44px] items-center justify-center text-faint"
                  >
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={`h-[44px] min-w-[44px] rounded-[11px] border-[1.5px] px-3.5 font-semibold transition-all duration-200 ${
                    currentPage === page
                      ? "border-accent bg-accent text-ink"
                      : "border-line-strong bg-card text-muted hover:border-accent"
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
            className="flex h-[44px] min-w-[44px] items-center justify-center rounded-[11px] border-[1.5px] border-line-strong bg-card px-3.5 text-muted transition-all duration-200 hover:border-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line-strong"
            aria-label={t("nextPage")}
          >
            <svg
              className="h-5 w-5"
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
