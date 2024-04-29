import Block from '../../shared/Block.ts';

type UserListDialogProps = {
  title: string;
  events: unknown;
};

class UserListDialog extends Block {
  constructor(props: UserListDialogProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `
      <div class='user-dialog'>
        <span class='user-dialog__close-mark' type='button'>x</span>
        <h3 class='user-dialog__header'>{{{ title }}}</h3>
        <div>
        </div>
      </div>
    `;
  }
}

export default UserListDialog;
