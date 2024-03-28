import Block from '../../shared/Block.ts';

type SearchInputProps = {
  value: string;
};

class SearchInput extends Block {
  constructor(props: SearchInputProps) {
    super({
      value: props.value,
    });
  }
  override render() {
    return `
      <form class='search-input'>
        <input class='search-input__input' type='text' value='{{value}}' placeholder='Поиск'>
      </form>
    `;
  }
}

export default SearchInput;
