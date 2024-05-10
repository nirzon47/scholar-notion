import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode' // or any other library to decode JWT tokens

const isTokenExpired = (token: string) => {
	if (!token) {
		return true
	}

	const decoded = jwtDecode(token)
	const currentTime = Date.now() / 1000

	return decoded.exp! < currentTime
}

export const tokenAtom = atom(
	(get) => {
		const token = Cookies.get('scholarToken')

		if (token && !isTokenExpired(token)) {
			return token
		}

		return null
	},
	(get, set, update) => {
		const token = update as string
		console.log(token)

		if (token) {
			Cookies.set('scholarToken', token)
		} else {
			Cookies.remove('scholarToken')
		}

		// set(token as any)
	},
)

export const mobileNavOpenAtom = atom(false)
// export const scholarToken = atomWithStorage('scholarToken', '')
