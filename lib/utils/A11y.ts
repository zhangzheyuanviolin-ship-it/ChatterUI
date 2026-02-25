export const normalizeA11yLabel = (value?: string | null): string | undefined => {
    if (!value) return undefined
    return value
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

export const firstDefined = <T>(...values: Array<T | undefined>): T | undefined => {
    return values.find((value) => value !== undefined)
}
