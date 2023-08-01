import type { FC } from '@/types'
import { MagnifyingGlass } from 'react-loader-spinner'

const Loader: FC = () => {
  return (
    <MagnifyingGlass
      color='var(--color-main)'
      glassColor='var(--color-white)'
      height='6rem'
      width='6rem'
      wrapperClass='loader'
      ariaLabel='loading indicator'
    />
  )
}

export default Loader
