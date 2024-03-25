import { Events, NodeRole } from "../components/Simulation/BinaryTree/BinaryTreeTypes";


export interface Snapshot<T, Y> {
  data: T; // main data type for data structure e.g. array, tree
  actions: Events;
  codeRef: {
    line: number;
    name: Y;
  };
  roles: NodeRole[];
}

export abstract class Memento<T, Y> {
  snapshots: Snapshot<T, Y>[];

  defaultAlgName: Y;

  protected constructor(defaultAlgName: Y) {
    this.snapshots = [];
    this.defaultAlgName = defaultAlgName;
  }

  getData(index: number) {
    if (index < 0 || index >= this.snapshots.length) {
      throw new Error("Index out of range");
    }
    return this.snapshots[index].data;
  }

  getLastData() {
    if (!this.snapshots.length) {
      throw new Error("No snapshots");
    }
    return this.snapshots[this.snapshots.length - 1].data;
  }

  getRoles(index: number) {
    if (index < 0 || index >= this.snapshots.length) {
      throw new Error("Index out of range");
    }
    return this.snapshots[index].roles;
  }

  getActions(index: number) {
    if (index < 0 || index >= this.snapshots.length) {
      throw new Error("Index out of range");
    }
    return this.snapshots[index].actions;
  }

  clearSnapshots() {
    this.snapshots = [];
  }

  getCurrentAlg() {
    if (this.snapshots.length) {
      return this.snapshots[0].codeRef.name;
    }
    return this.defaultAlgName;
  }

  getCodeRef(index: number) {
    if (index < 0 || index >= this.snapshots.length) {
      throw new Error(`Index ${index} out of range, length is ${this.snapshots.length}`);
    }
    return this.snapshots[index].codeRef;
  }

  getLength() {
    return this.snapshots.length;
  }
}
