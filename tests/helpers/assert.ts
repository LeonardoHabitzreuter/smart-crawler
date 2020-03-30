export const shouldBe = (a: Date, b: Date) => {
  expect(a.getFullYear()).toBe(b.getFullYear())
  expect(a.getMonth()).toBe(b.getMonth())
  expect(a.getDate()).toBe(b.getDate())
}