export function postOrderTraversal(tree, handleToken) {
  // Если дерево пусто, то нужно остановить обход
  if (!tree) {
    return;
  }

  // Сначала обходим левое поддерево
  postOrderTraversal(tree.leftChildNode, handleToken);

  // Затем обходим правое поддерево
  postOrderTraversal(tree.rightChildNode, handleToken);

  handleToken(tree.token);

  // В конце выводим значение текущего узла
  console.log(tree.token);
}
