export class Attributes<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    //? Key is a generic that its type can be one of the types of they key of T.
    //! T ise UserProps with name, age, id (string, number, number) and K can only be one of these three.
    //? T[K] is one of these types as return output ofc

    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
    // copy data comes from update and override this.data (replace data)
  }

  getAll(): T {
    return this.data;
  }
}
