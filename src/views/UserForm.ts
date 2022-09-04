import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      //   "click:button": this.onButtonClick,
      //* click:button will trigger all buttons. so we use class/id from now on
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick,
      "click:.save-model": this.onSaveModel,
    };
  }

  //   onButtonClick(): void {
  //     console.log("button is clicked");
  //   }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  onSaveModel = (): void => {
    this.model.save();
  };

  template(): string {
    return `
        <div>
            <input placeholder="name"/>
            <button class="set-name">Set Name</button>
            <button class="set-age">Set Random Age</button>
            <button class="save-model">Save User</button>
        </div>
        `;
  }
}
