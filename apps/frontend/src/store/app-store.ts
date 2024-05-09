import { writable } from 'svelte/store'

export interface AppStore {
	loading: boolean
}

export const appStore = writable<AppStore>({ loading: false })
