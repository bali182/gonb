const alwaysTrue = () => true

export class NonRepeatingRandom<T> {
  private lastIndex: number | undefined = undefined

  constructor(private readonly array: T[]) {}

  public next(predicate: (input: T) => boolean = alwaysTrue): T {
    const filteredArray =
      predicate === alwaysTrue ? this.array : this.array.filter(predicate)

    switch (filteredArray.length) {
      case 0: {
        throw new Error(`Can't select random element from an empty array.`)
      }
      case 1: {
        return filteredArray[0]!
      }
      default: {
        let index: number
        do {
          index = Math.floor(Math.random() * filteredArray.length)
        } while (index === this.lastIndex)

        this.lastIndex = index
        return filteredArray[index]!
      }
    }
  }
}
