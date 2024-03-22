'use client'

import { useState, useEffect } from 'react'
import TVData from '@/types/TVData'
import SkeletonBox from '@/components/UI/SkeletonBox'
import CardBox from '@/components/TV/CardBox'
import Paginate from '@/components/UI/Paginate'

export default function Layout() {
  const [tvShow, setTVShows] = useState<TVData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL
  const NO_IMAGE = process.env.NEXT_PUBLIC_NO_IMAGE

  useEffect(() => {
    fetch(`/api/movies?endpoint=tv/popular&page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        return response.json()
      })
      .then((data) => setTVShows(data.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [currentPage])

  return (
    <>
      {error && <h1 className="heading">This is an error - {error}</h1>}
      <div className="mb-32 grid text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:grid-cols-5 lg:text-left gap-4">
        {loading ? (
          <>
            {[...Array(20)].map((_, index) => (
              <SkeletonBox key={index} />
            ))}
          </>
        ) : (
          tvShow.map((tv) => (
            <CardBox
              {...tv}
              image={
                tv.poster_path ? `${BASE_IMAGE_URL}${tv.poster_path}` : NO_IMAGE
              }
              key={tv.id}
            />
          ))
        )}
      </div>
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={500}
      />
    </>
  )
}
