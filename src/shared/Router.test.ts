import { expect } from 'chai';
import Sinon from 'sinon';
import Router from '../shared/Router.ts';
import Block, { Props } from '../shared/Block.ts';
import { describe } from 'mocha';

describe('Test Router', function () {
  let TestBlock: typeof Block;
  let TestBlock2: typeof Block;

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

    class Test2 extends Block {
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
    TestBlock2 = Test2;
  });

  it('Use add path to routes', function () {
    const TestRouter = new Router();
    TestRouter.use('/test', TestBlock);
    expect(TestRouter.routes).to.have.lengthOf(1);
  });

  it('Go to be called', function () {
    const TestRouter = new Router();
    const stub = Sinon.stub(window.history, 'pushState');
    TestRouter.use('/test', TestBlock);
    TestRouter.go('/test');
    expect(stub.calledWith({}, '', '/test')).to.be.true;
    stub.restore();
  });

  it('Test back', function () {
    const TestRouter = new Router();
    const stub = Sinon.stub(window.history, 'back');

    TestRouter.back();
    expect(stub.called).to.be.true;
    stub.restore();
  });

  it('Test navigate with go', function () {
    const TestRouter = new Router();
    const stub = Sinon.stub(window.history, 'pushState');
    TestRouter.use('/test', TestBlock);
    TestRouter.go('/test');
    TestRouter.use('/test2', TestBlock2);
    TestRouter.go('/test2');
    expect(TestRouter._currentRoute?._pathname).to.equal('/test2');
    stub.restore();
  });

  it('Test forward', function () {
    const TestRouter = new Router();
    const stub = Sinon.stub(window.history, 'forward');

    TestRouter.forward();
    expect(stub.called).to.be.true;

    stub.restore();
  });
});
