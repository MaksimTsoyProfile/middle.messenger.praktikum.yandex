import { Button, Input } from '../../components/index.ts';
import Block from '../../shared/Block.ts';

type AddUserDialogProps = {
  title: string;
  buttonText: string;
  events: unknown;
  inputName: string;
  inputLabel: string;
};

class UserDialog extends Block {
  constructor(props: AddUserDialogProps) {
    super({
      LoginInput: new Input({
        type: 'text',
        name: props.inputName,
        label: props.inputLabel,
        value: '',
        error: '',
      }),
      Button: new Button({
        type: 'submit',
        text: props.buttonText,
      }),
      ...props,
    });
  }

  override render() {
    return `
      <form class='user-dialog'>
        <span class='user-dialog__close-mark' type='button'>x</span>
        <h3 class='user-dialog__header'>{{{ title }}}</h3>
        <div class='user-dialog__input-block'>
          {{{ LoginInput }}}
        </div>
        <div class='user-dialog__footer'>
          {{{ Button }}}
        </div>
      </form>
    `;
  }
}

export default UserDialog;
