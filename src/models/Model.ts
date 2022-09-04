import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  //! We created functions in separete classes and added them here with code up here but since we want to functions should work together and transfer data from each other and client should use this class user.fetch() instead of user.eventing.fetch() we created following functions here as well.

  get on() {
    return this.events.on;
    //? dont invoke function here!
    //* This will return on() function from eventing.ts and we wont have to use user.events.on(). instead user.on() will be enough and whenever we update eventing.ts this function will be updated as well.
  }

  //? Even shorter syntax for creating a getter. First one will stay as an example;
  trigger = this.events.trigger;
  get = this.attributes.get;
  //! this syntax would not work at first iteration
  //* If we initialize propterties in the constructor, those properties will run after this line of code. thats why this wont work.

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    // const id = this.attributes.get("id");
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch user without id");
    }

    this.sync.fetch(id).then((res: AxiosResponse): void => {
      // this.attributes.set(res.data);
      this.set(res.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
