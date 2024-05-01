import Block from '../shared/Block.ts';
import { renderDOM, isEqual } from './utils.ts';

class Route {
  private _pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _blockClass: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _block: any;

  constructor(pathname: string, view: InstanceType<typeof Block>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDOM(this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
