import { ChatController } from '../../controllers/ChatController.ts';
import { ChatUser } from '../../shared/Store.ts';
import { PopupItem } from '../../components/PopupItem';
import { connect } from '../../shared/connect.ts';
import Block from '../../shared/Block.ts';

type UserListDialogProps = {
  title: string;
  events: unknown;
  chatUsers: [];
  ChatUsersList: [];
};

class UserListDialog extends Block {
  constructor(props: UserListDialogProps) {
    super({
      ...props,
      ChatUsersList: props.ChatUsersList,
    });
  }

  override render() {
    return `
      <div class='user-dialog'>
        <span class='user-dialog__close-mark' type='button'>x</span>
        <h3 class='user-dialog__header'>{{{ title }}}</h3>
        <div>
          {{{ ChatUsersList }}}
        </div>
      </div>
    `;
  }
}

const userListDialogConnect = connect((state) => {
  const chatController = new ChatController();
  const ChatUsersList =
    state.chatUsers.length > 0
      ? state.chatUsers.map(
          (chatUser: ChatUser) =>
            new PopupItem({
              text: chatUser.first_name,
              srcIcon: '../../icons/removeIcon.svg',
              events: {
                click: () => {
                  chatController.deleteUserFromChat({
                    users: [chatUser.id],
                    chatId: Number(state.selectedChat),
                  });
                },
              },
            }),
        )
      : null;
  return {
    ChatUsersList,
  };
});

export default userListDialogConnect(UserListDialog);
