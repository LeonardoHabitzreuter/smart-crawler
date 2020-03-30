import { JSDOM } from 'jsdom'
import { fromNullable } from 'fp-ts/lib/Option'
import { flow } from 'fp-ts/lib/function'
import { trim } from '~/common/string'

export const fromURL = async (URL: string) => {
  const { window } = await JSDOM.fromURL(URL)
  const { document } = window

  return { document, window }
}

export const querySelectorAll = (selector: string) => ($parent: Element | Document) => (
  $parent.querySelectorAll(selector)
)

export const querySelector = (selector: string) => ($parent: Element | Document) => (
  fromNullable($parent.querySelector(selector))
)

export const trimInnerHTML = flow(
  (div: Element) => div.innerHTML,
  trim
)
