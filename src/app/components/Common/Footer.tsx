import Link from 'next/link'

const Footer: React.FC = () => {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="flex items-center justify-center text-tiny py-6 border-default-200 border-t-1">
      <div className="px-3 max-w-[1170px]">
        &copy; {year} CinemApp. All Rights Reserved. Developed by&nbsp;
        <Link
          href="https://njordulv-portfolio.vercel.app/"
          className="hover:text-red transition-all"
        >
          Njordr
        </Link>
      </div>
    </footer>
  )
}

export default Footer
