import { Eventing } from "./Eventing";
import axios, { AxiosResponse } from "axios";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((element: K) => {
        // const user = User.buildUser(element);
        // this.models.push(user);
        //* we created a generic funtion to get json data and create elements with deserialize()
        this.models.push(this.deserialize(element));
      });
      this.trigger("change");
    });
  }
}
