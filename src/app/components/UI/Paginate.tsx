import { Pagination } from '@nextui-org/react'
import { CustomButton } from '@/components/UI/CustomButton'

interface PaginateProps {
  currentPage: number
  total: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Paginate: React.FC<PaginateProps> = ({
  currentPage,
  setCurrentPage,
  total,
}) => {
  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev < total ? prev + 1 : prev))
  }

  return (
    <div className="mb-32 flex text-center lg:max-w-[1170px] lg:w-full lg:mb-0 lg:text-left items-center justify-center gap-4 my-8">
      <CustomButton color="special" onClick={prevPage}>
        Prev
      </CustomButton>
      <Pagination
        showShadow
        total={total}
        page={currentPage}
        onChange={(page) => setCurrentPage(page)}
        classNames={{
          base: 'px-0',
          wrapper: 'gap-1 overflow-visible h-8 rounded border border-divider',
          item: 'w-9 h-9 text-small bg-black rounded-lg text-white [&[data-hover=true]:not([data-active=true])]:bg-special',
          cursor: 'bg-special text-white font-bold shadow-none rounded-lg',
        }}
      />
      <CustomButton color="special" onClick={nextPage}>
        Next
      </CustomButton>
    </div>
  )
}

export default Paginate
