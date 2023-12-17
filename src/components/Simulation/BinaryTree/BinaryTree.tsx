import { AnimatePresence } from "framer-motion";
import { FC } from "react";

import BinaryTreeNode from "./BinaryTreeNode";
import { Events, NodeRole, TreeNode } from "./BinaryTreeTypes";

import { NodeObj } from "../../../ClassObjects/NodeObj";


interface BTProps {
  root: TreeNode | undefined;
  level: number;
  speed: number;
  height: number;
  actions: Events | null;
  currentHeapSize?: number;
  roles: NodeRole[];
  viewportWidth: number;
  isBST?: boolean;
  visitedNodes?: number[];
  passedNodes?: number[];
}

const BinaryTree: FC<BTProps> = (props) => {
  const {
    speed,
    level,
    root,
    passedNodes,
    visitedNodes,
    height,
    actions,
    currentHeapSize,
    roles,
    viewportWidth,
    isBST,
  } = props;
  const treeObjects = NodeObj.generateTreeObjects(
    viewportWidth,
    height,
    speed,
    root,
    level,
    currentHeapSize,
    isBST,
  );
  NodeObj.setActions(treeObjects, actions, isBST);
  NodeObj.setRoles(treeObjects, roles, isBST);
  if (isBST && visitedNodes) {
    NodeObj.setVisited(treeObjects, visitedNodes);
  }
  if (isBST && passedNodes) {
    NodeObj.setPassed(treeObjects, passedNodes);
  }
  return (
    <div>
      <AnimatePresence>
        {treeObjects.map((nodeObj) => (
          <BinaryTreeNode
            nodeObj={nodeObj}
            key={nodeObj.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
export default BinaryTree;
