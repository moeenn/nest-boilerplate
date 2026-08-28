export type Paginated<T> = Promise<{
	total: number
	data: T[]
	limit?: number
	offset?: number
}>
