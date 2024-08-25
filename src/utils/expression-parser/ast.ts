export function postOrderTraversal(tree, handleToken) {
  if (!tree) {
    return;
  }

  postOrderTraversal(tree.leftChildNode, handleToken);

  postOrderTraversal(tree.rightChildNode, handleToken);

  handleToken(tree.token);

  console.log(tree.token);
}
