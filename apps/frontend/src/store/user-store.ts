import { writable } from 'svelte/store'

export const user = writable<UserEntity | null>(null)
