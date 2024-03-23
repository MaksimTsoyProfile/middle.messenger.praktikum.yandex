import { Link } from '../../components/Link';
import Block from '../../shared/Block.ts';

type ErrorContentProps = {
  title: string;
  description: string;
  linkText: string;
  linkPage: string;
};

class ErrorContent extends Block {
  constructor(props: ErrorContentProps) {
    super({
      title: props.title,
      description: props.description,
      Link: new Link({
        text: props.linkText,
        page: props.linkPage,
      }),
    });
  }
  override render() {
    return `
      <div class='error-container'>
        <h2>{{ title }}</h2>
        <h3>{{ description }}</h3>
        <span>{{{ Link }}}</span>
      </div>
    `;
  }
}

export default ErrorContent;
