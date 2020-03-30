import Dataloader from 'dataloader'

const { CLEAR_DATALOADER_INTERVAL = '86400000' } = process.env

type OnLoad<T> = (value: string) => Promise<T>

const loadData = <T>(fn: OnLoad<T>) => {
  const loader = new Dataloader((keys: readonly string[]) => (
    Promise.all(keys.map(fn)
  )))

  setInterval(
    () => loader.clearAll(),
    parseInt(CLEAR_DATALOADER_INTERVAL)
  )

  return loader
}

export default loadData