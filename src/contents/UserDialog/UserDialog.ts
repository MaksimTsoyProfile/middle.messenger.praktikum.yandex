import { Button, Input } from '../../components';
import Block from '../../shared/Block.ts';

type AddUserDialogProps = {
  open: boolean;
  title: string;
  buttonText: string;
  events: unknown;
};

class UserDialog extends Block {
  constructor(props: AddUserDialogProps) {
    super({
      LoginInput: new Input({
        type: 'text',
        name: 'login',
        label: 'Логин',
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
      {{#if open}}
        <form class='user-dialog'>
          <h3 class='user-dialog__header'>{{{ title }}}</h3>
          <div class='user-dialog__input-block'>
            {{{ LoginInput }}}
          </div>
          <div class='user-dialog__footer'>
            {{{ Button }}}
          </div>
        </form>
      {{else}}
        <div></div>
      {{/if}}
    `;
  }
}

export default UserDialog;
