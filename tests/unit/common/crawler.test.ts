import { JSDOM } from 'jsdom'
import { none } from 'fp-ts/lib/Option'
import { querySelector, querySelectorAll } from '~/lib/crawler'
import { fromOption } from '../../helpers/option'

describe('querySelector', () => {
  test('should return none when element has no child', () => {
    const find = querySelector('#test')
    var document = new JSDOM()
    const element = document.window.document.createElement('div', { is: 'div' })
    
    const response = find(element)

    expect(response).toBe(none)
  })

  test('should return child from parent', () => {
    const find = querySelector('#test')
    var document = new JSDOM()
    const parent = document.window.document.createElement('div', { is: 'div' })
    const child = document.window.document.createElement('h1', { is: 'h1' })
    child.id = 'test'
    parent.prepend(child)

    const response = find(parent)

    expect(fromOption(response)).toBe(child)
  })
})

describe('querySelectorAll', () => {
  test('should return all childs from parent', () => {
    const find = querySelectorAll('.test')
    var document = new JSDOM()
    const parent = document.window.document.createElement('div', { is: 'div' })
    const child1 = document.window.document.createElement('h1', { is: 'h1' })
    const child2 = document.window.document.createElement('h1', { is: 'h1' })
    child1.className = 'test'
    child2.className = 'test'
    parent.prepend(child1, child2)

    const response = find(parent)

    expect(response).toContain(child1)
    expect(response).toContain(child2)
  })
})
