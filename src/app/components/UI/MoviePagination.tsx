import { Pagination } from '@nextui-org/react'
import { CustomButton } from '@/components/UI/CustomButton'

interface PaginationProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function MoviePagination({
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = 500

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
  }

  return (
    <div className="mb-32 flex text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:text-left items-center justify-center gap-4 my-8">
      <CustomButton color="blue" onClick={prevPage}>
        Prev
      </CustomButton>
      <Pagination
        showShadow
        total={totalPages}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
        classNames={{
          base: 'px-0',
          wrapper: 'gap-1 overflow-visible h-8 rounded border border-divider',
          item: 'w-9 h-9 text-small bg-blueDark rounded-lg text-dark',
          cursor: 'bg-blue text-white font-bold shadow-none rounded-lg',
        }}
      />
      <CustomButton color="blue" onClick={nextPage}>
        Next
      </CustomButton>
    </div>
  )
}
