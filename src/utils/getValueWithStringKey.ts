type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${Path<T[K]>}`
          : `${K}`
        : never
    }[keyof T]
  : never

type PathValue<T, P extends string> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? PathValue<T[Key], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never

export const getValueWithStringKey = <T, P extends Path<T>>(
  obj: T,
  path: P,
): PathValue<T, P> | undefined => {
  const parts = path.split(".") as string[]

  let current: unknown = obj
  for (const key of parts) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return undefined
    }
  }

  return current as PathValue<T, P>
}
