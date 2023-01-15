import {
	type PathOrFileDescriptor,
	type WriteFileOptions,
	promises,
	readFileSync,
	realpath,
	realpathSync,
	writeFileSync
} from 'fs'

/**
 * read json file
 *
 * @example
 * ```ts
 * import { readJSON } from '@node-kit/utils'
 * const data = await readJSON('/path/of/json', { encoding: 'utf8 }) // { "name": "saqqdy" }
 * ```
 * @param args - Parameters<typeof promises.readFile>
 * @param args.path - Path to file
 * @param args.options - options
 * @returns result - json | {}
 */
export async function readJSON(
	...args: Parameters<typeof promises.readFile>
): Promise<Record<string, unknown>> {
	const data = await promises.readFile(...args).toString()
	try {
		return JSON.parse(data)
	} catch {
		return {}
	}
}

/**
 * read json file sync function
 *
 * @example
 * ```ts
 * import { readJSONSync } from '@node-kit/utils'
 * const data = readJSONSync('/path/of/json', { encoding: 'utf8 }) // { "name": "saqqdy" }
 * ```
 * @param args - Parameters<typeof readFileSync>
 * @param args.path - Path to file
 * @param args.options - options
 * @returns result - json | {}
 */
export function readJSONSync(...args: Parameters<typeof readFileSync>): Record<string, unknown> {
	const data = readFileSync(...args).toString()
	try {
		return JSON.parse(data)
	} catch {
		return {}
	}
}

/**
 * write json file
 *
 * @example
 * ```ts
 * import { writeJSON } from '@node-kit/utils'
 * writeJSON('/path/of/file', 'test data', { encoding: 'utf8 }).then(() => {})
 * ```
 * @param args - Parameters<typeof promises.writeFile>
 * @param args.path - Path to file
 * @param args.data - data
 * @param args.options - options
 */
export async function writeJSON(
	file: Parameters<typeof promises.writeFile>[0],
	data: Record<string, unknown> | Parameters<typeof promises.writeFile>[1],
	options?: WriteFileOptions
): Promise<void> {
	if (typeof data === 'object') {
		data = (data && JSON.stringify(data, null, 4)) || ''
	}
	await promises.writeFile(file, data, options)
}

/**
 * write json file sync function
 *
 * @example
 * ```ts
 * import { writeJSONSync } from '@node-kit/utils'
 * writeJSONSync('/path/of/file', 'test data', { encoding: 'utf8 })
 * ```
 * @param args - Parameters<typeof writeFileSync>
 * @param args.path - Path to file
 * @param args.data - data
 * @param args.options - options
 */
export function writeJSONSync(
	file: PathOrFileDescriptor,
	data: Record<string, unknown> | Parameters<typeof writeFileSync>[1],
	options?: WriteFileOptions
): void {
	if (typeof data === 'object') {
		data = (data && JSON.stringify(data, null, 4)) || ''
	}
	writeFileSync(file, data, options)
}

/**
 * resolve realpath
 *
 * @param path - the path
 * @returns result - the realpath
 */
export async function getRealPath(path: string) {
	return new Promise<string>(resolve => {
		// We need to resolve the real native path for case-insensitive file systems.
		// For example, we can access file as C:\Code\Project as well as c:\code\projects
		// Without this we can face a problem when try to install packages with -w flag,
		// when root dir is using c:\code\projects but packages were found by C:\Code\Project
		realpath.native(path, function (err, resolvedPath) {
			resolve(err !== null ? path : resolvedPath)
		})
	})
}

/**
 * resolve realpath sync function
 *
 * @param path - the path
 * @returns result - the realpath
 */
export function getRealPathSync(path: string) {
	return realpathSync.native(path)
}