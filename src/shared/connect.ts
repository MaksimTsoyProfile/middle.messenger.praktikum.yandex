import { isDeepEqual } from './utils.ts';
import Block, { Props } from './Block.ts';
import store, { Indexed, StoreEvents } from './Store.ts';

export const connect =
  (mapStateToProps: (state: Indexed) => Indexed) =>
  (Component: typeof Block) => {
    return class extends Component {
      constructor(props: Props) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });
        store.on(StoreEvents.UPDATED, () => {
          const newState = mapStateToProps(store.getState());
          if (!isDeepEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };

export const withUser = connect((state) => ({ ...state.user }));
export const withChats = connect((state) => ({ ...state }));
