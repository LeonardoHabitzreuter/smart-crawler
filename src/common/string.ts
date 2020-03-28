export const trim = (a: string) => a.trim()

export const replace = (a: string, b: string) => (c: string) => (
  c.replace(a, b)
)
