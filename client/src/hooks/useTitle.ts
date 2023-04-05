import { useEffect } from 'react'

export const useTitle = (title: string) => {
    
	useEffect(() => {
		const shortTitle = `${title}` || 'Meditatii Online'
		document.title =  `${shortTitle} | meditat.io`
	},[title])
}