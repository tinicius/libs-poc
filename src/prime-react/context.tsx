import { TreeViewBaseItem } from "@mui/x-tree-view";
import React, { ReactNode, createContext, useState } from "react";

interface NodeType {
  key: string;
  label: string;
  children?: NodeType[];
}

const nodes = [
  {
    key: "0",
    label: "Installation",
    children: [],
  },
  {
    key: "1",
    label: "Main Concepts",
    children: [],
  },
];

interface Menu {
  items: NodeType[];
  addItem: (parent: string, item: NodeType) => void;
}

export const MyContext = createContext<Menu>({ addItem: () => {}, items: [] });

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<NodeType[]>(nodes);

  const f = (parent: string, item: NodeType) => {
    const insert = (actual: NodeType, p: string, item: NodeType) => {
      if (actual.key === p) {
        if (actual.children) actual.children = [...actual.children, item];
        return;
      }

      if (actual.children) {
        actual.children.forEach((c) => insert(c, p, item));
      }
    };

    setItems((items) => {
      items.forEach((i) => insert(i, parent, item));
      return [...items];
    });
  };

  return (
    <MyContext.Provider
      value={{
        items,
        addItem: f,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
