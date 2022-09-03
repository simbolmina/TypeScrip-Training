import { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";

export interface UserProps {
  //! properties are optional with ?
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl: string = "http://localhost:3000/users";

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

  //! We created functions in separete classes and added them here with code up here but since we want to functions should work together and transfer data from each other and client should use this class user.fetch() instead of user.eventing.fetch() we created following functions here as well.

  get on() {
    return this.events.on;
    //? dont invoke function here!
    //* This will return on() function from eventing.ts and we wont have to use user.events.on(). instead user.on() will be enough and whenever we update eventing.ts this function will be updated as well.
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
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
