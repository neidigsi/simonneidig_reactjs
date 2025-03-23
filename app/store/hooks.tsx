// Import external dependencies
import { useDispatch, useSelector } from 'react-redux'

// Import internal dependencies
import type { RootState, AppDispatch } from '@/store/store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()