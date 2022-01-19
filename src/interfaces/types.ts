export type Dictionary<T> = {
	[Key: string]: T
}

export type Constructor<T> = {
	new (...args: any[]): T
	readonly prototype: T
}
