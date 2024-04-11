export const isEqual = (lhs: unknown, rhs: unknown) => {
  return lhs === rhs;
};

export const renderDOM = (block: { getContent: () => HTMLElement }) => {
  const root = document.getElementById('app') as HTMLElement;
  root.append(block.getContent());
  return root;
};
