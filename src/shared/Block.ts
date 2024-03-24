import EventBus from './EventBus';
import Handlebars from 'handlebars';

type Props = Record<string, unknown>;

type Attributes = Record<string, string>;

type EventHandlers = Record<string, (event: Event) => void>;

type Events = {
  INIT: string;
  FLOW_CDM: string;
  FLOW_RENDER: string;
  FLOW_CDU: string;
};

type ChildBlock = Block | string;
type Children = ChildBlock[];

export default class Block {
  static EVENTS: Events = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  };

  _element: HTMLElement | null = null;
  _meta: { tagName: string; props: Props } | null = null;
  _id = Math.floor(100000 + Math.random() * 900000);
  props: Props;
  eventBus: () => EventBus;
  lists: object;
  children: Children | object;

  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {} as EventHandlers } = this.props;
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources(): void {
    const { tagName } = this._meta!;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps?: Props): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  _getChildrenPropsAndProps(propsAndChildren: Props) {
    const children: Record<string, Block> = {};
    const props: Props = {};
    const lists: any = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });
    return { children, props, lists };
  }

  addAttributes() {
    const { attr = {} as Attributes } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, value as string);
    });
  }

  setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    const propsAndStubs: Props = { ...this.props };
    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub?.replaceWith(child.getContent());
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement('template');
      child.forEach((item: Block | string) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent() as Node);
        } else {
          listCont.content.append(`${item}`);
        }
      });
      // fragment.content.innerHTML = listCont.content;
      const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
      stub?.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild as Node;
    if (this._element) {
      this._element?.replaceWith(newElement);
    }
    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  render(): void {}

  public getContent(): HTMLElement | null {
    return this.element;
  }

  _makePropsProxy(props: Props): Props {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {
          oldProps: oldTarget,
          newProps: target,
        });
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName) as HTMLTemplateElement;
  }

  show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
