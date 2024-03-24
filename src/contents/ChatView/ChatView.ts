import { Message } from '../../components/Message';
import { Avatar } from '../../components/Avatar';
import { ChatInput } from '../../components/ChatInput';
import { ChatMessages } from '../../contents/ChatMessages';
import Block from '../../shared/Block.ts';

type ChatViewProps = {
  name: string;
  src: string;
  value?: string;
};

class ChatView extends Block {
  constructor(props: ChatViewProps) {
    super({
      name: props.name,
      Avatar: new Avatar({
        src: props.src || '',
      }),
      ChatInput: new ChatInput({
        value: props.value || '',
      }),
      chatMessages: [
        new ChatMessages({
          date: '12.03',
          messages: [
            new Message({
              isMyself: false,
              time: '11:56',
              text:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n' +
                '\n' +
                'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
            }),
            new Message({
              isMyself: true,
              isDone: true,
              time: '12:00',
              text: 'Круто',
            }),
          ],
        }),
        new ChatMessages({
          date: '13.03',
          messages: [
            new Message({
              isMyself: false,
              time: '11:56',
              text: 'Рад что тебе понравилось',
            }),
            new Message({
              isMyself: true,
              isDone: true,
              time: '12:00',
              text: 'Присылай еще',
            }),
          ],
        }),
      ],
    });
  }
  override render() {
    return `
      <div class='chat-view'>
        <div class='chat-view__header'>
          <div class='chat-view__header__avatar'>
            {{{ Avatar }}}
          </div>
          <h3 class='chat-view__header__name'>
            {{ name }}
          </h3>
          <div class='chat-view__header__dots'>
            <img src='../../icons/vertical-dots.svg' alt='dots'>
          </div>
        </div>
        <div class='chat-view__body'>
          {{{ chatMessages }}}
        </div>
        <form class='chat-view__footer'>
          <img src='../../icons/clip.svg' alt='clip' class='chat-view__footer__clip'>
          {{{ ChatInput }}}
          <img src='../../icons/arrowRightIcon.svg' alt='arrow' class='chat-view__footer__arrow'>
        </form>
      </div>
    `;
  }
}

export default ChatView;
