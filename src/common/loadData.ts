import Dataloader from 'dataloader'

type OnLoad<T> = (value: string) => Promise<T>

const loadData = <T>(fn: OnLoad<T>) => {
  const { CLEAR_DATALOADER_INTERVAL = '86400000' } = process.env

  const loader = new Dataloader((keys: readonly string[]) => (
    Promise.all(keys.map(fn)
    )))

  setInterval(
    () => loader.clearAll(),
    parseInt(CLEAR_DATALOADER_INTERVAL, 10)
  )

  return loader
}

export default loadData
