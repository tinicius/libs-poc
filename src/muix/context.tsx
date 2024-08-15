import { TreeViewBaseItem } from "@mui/x-tree-view";
import React, { ReactNode, createContext, useState } from "react";

interface Menu {
  items: TreeViewBaseItem[];
  addItem: (parent: string, item: TreeViewBaseItem) => void;
}

export const MyContext = createContext<Menu>({ addItem: () => {}, items: [] });

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<TreeViewBaseItem[]>([
    {
      id: "1",
      label: "Item 1",
      children: [
        {
          id: "2",
          label: "Item 2",
          children: [{ id: "3", label: "Item 3", children: [] }],
        },
      ],
    },
  ]);

  const f = (parent: string, item: TreeViewBaseItem) => {
    console.log(parent);
    console.log(item);

    const insert = (
      actual: TreeViewBaseItem,
      p: string,
      item: TreeViewBaseItem
    ) => {
      if (actual.id === p) {
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
