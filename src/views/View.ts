import { Model } from "../models/Model";

// interface ModelForView {
//   on(eventName: string, callback: () => void): void;
// }

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  //* T will have all properties from Model with Type K loaded in it.
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  //   abstract eventsMap(): { [key: string]: () => void };

  abstract template(): string;

  regionsMap(): { [key: string]: string } {
    return {};
  }

  eventsMap(): { [key: string]: () => void } {
    return {};
    //now eventsMap is not required for future implementations
  }

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      // eventName = 'click' and selector = 'button' here
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {}

  render(): void {
    this.parent.innerHTML = "";
    //? empty html before re-render
    //* we are converting the string from template() into html element here with 'template' element keyword
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    //* assign this element to child of 'parent' Element.
    this.parent.append(templateElement.content);
  }
}
