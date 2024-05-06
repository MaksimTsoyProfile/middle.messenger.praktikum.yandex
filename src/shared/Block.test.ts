import { expect } from 'chai';
import Sinon from 'sinon';
import Block, { Props } from '../shared/Block.ts';
import { describe } from 'mocha';

describe('Test Block', () => {
  let TestBlock: typeof Block;

  before(() => {
    class Test extends Block {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      render() {
        return `<div id="div">{{text}}</div>`;
      }
    }

    TestBlock = Test;
  });

  it('Test render props', () => {
    const textData = 'I am div!';
    const TestButton = new TestBlock({ text: textData });
    const res = (TestButton.element as unknown as HTMLDivElement)?.innerHTML;

    expect(res).to.be.eq(textData);
  });

  it('Test events', () => {
    const handler = Sinon.stub();
    const TestButton = new TestBlock({
      text: 'I am button!',
      events: { click: handler },
    });

    const event = new MouseEvent('click');
    (TestButton.element as unknown as HTMLDivElement)?.dispatchEvent(event);

    expect(handler.calledOnce).to.be.true;
  });
});
