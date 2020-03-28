import { JSDOM } from 'jsdom'
import { fromNullable } from 'fp-ts/lib/Option'

export const fromURL = async (URL: string) => {
  const { window } = await JSDOM.fromURL(URL)
  const { document } = window

  return { document, window }
}

export const fromContent = (content: string) => {
  const { window } = new JSDOM(content)
  const { document } = window

  return { window, document }
}

export const querySelectorAll = (selector: string) => ($parent: Element | Document) => (
  $parent.querySelectorAll(selector)
)

export const querySelector = (selector: string) => ($parent: Element | Document) => (
  fromNullable($parent.querySelector(selector))
)

export default { fromURL, fromContent }
