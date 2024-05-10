import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const mobileNavOpenAtom = atom(false)
export const scholarToken = atomWithStorage('scholarToken', '')
