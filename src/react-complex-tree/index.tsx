import { useMemo, useRef, useState } from "react";
import {
  StaticTreeDataProvider,
  UncontrolledTreeEnvironment,
  TreeItem,
  Tree,
  ControlledTreeEnvironment,
  TreeItemIndex,
  TreeEnvironmentRef,
  TreeDataProvider,
} from "react-complex-tree";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { Content, Container } from "../styles";
import { BsMap, BsPlus } from "react-icons/bs";

interface T {
  [k: TreeItemIndex]: TreeItem<string>;
}

class CustomDataProviderImplementation implements TreeDataProvider {
  data: Record<TreeItemIndex, TreeItem<string>>;

  treeChangeListeners: ((changedItemIds: TreeItemIndex[]) => void)[] = [];

  constructor(items: Record<TreeItemIndex, TreeItem<string>>) {
    this.data = items;
  }

  async getTreeItem(itemId: TreeItemIndex) {
    return this.data[itemId];
  }

  async onChangeItemChildren(
    itemId: TreeItemIndex,
    newChildren: TreeItemIndex[]
  ) {
    this.data[itemId].children = newChildren;
    this.treeChangeListeners.forEach((listener) => listener([itemId]));
  }

  onDidChangeTreeData(listener: (changedItemIds: TreeItemIndex[]) => void) {
    this.treeChangeListeners.push(listener);
    return {
      dispose: () =>
        this.treeChangeListeners.splice(
          this.treeChangeListeners.indexOf(listener),
          1
        ),
    };
  }

  async onRenameItem(item: TreeItem, name: string) {
    this.data[item.index].data = name;
  }

  injectItem(parent: TreeItemIndex, name: string) {
    console.log("Injecting item", parent, name);

    let keys = Object.keys(this.data);

    keys.forEach((key) => {
      if (this.data[key].index === parent) {
        console.log("Found parent", key);
        const rand = `${Math.random()}`;
        this.data[rand] = {
          data: name,
          index: rand,
          isFolder: true,
          children: [],
        };

        let children = this.data[key].children;

        if (children) {
          children.push(rand);
        }

        this.treeChangeListeners.forEach((listener) => listener([key]));
      }
    });

    // const rand = `${Math.random()}`;
    // this.data[rand] = { data: name, index: rand };

    // if (this.data.root.children) {
    //   this.data.root.children.push(rand);
    // }

    this.treeChangeListeners.forEach((listener) => listener(["root"]));
  }
}

export const ReactComplexTree = () => {
  const mockItems: T = {
    master: {
      index: "master",
      canMove: true,
      isFolder: true,
      children: ["root"],
      data: "Root item",
      canRename: true,
    },
    root: {
      index: "root",
      canMove: true,
      isFolder: true,
      children: [],
      data: "Root item",
      canRename: true,
    },
  };

  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(["child2"]);

  const [items, setItems] = useState(mockItems);

  const ref = useRef<TreeEnvironmentRef<string, string>>();

  const dataProvider = useMemo(
    () => new CustomDataProviderImplementation(mockItems),
    []
  );

  return (
    <div
      style={{
        width: 300,
      }}
    >
      <UncontrolledTreeEnvironment
        canDragAndDrop={true}
        canDropOnFolder={true}
        canReorderItems={true}
        dataProvider={dataProvider}
        getItemTitle={(item) => item.data}
        renderDepthOffset={20}
        viewState={{
          ["tree-1"]: {
            expandedItems: ["container"],
          },
        }}
        renderItemTitle={({ title }) => <span>{title}</span>}
        renderItemArrow={({ item, context }) =>
          item.children?.length ? (
            <span {...context.arrowProps}>
              {context.isExpanded ? <MdArrowUpward /> : <MdArrowDownward />}
            </span>
          ) : null
        }
        renderItem={({
          title,
          arrow,
          depth,
          context,
          children,
          info,
          item,
        }) => {
          const InteractiveComponent: any = context.isRenaming
            ? "div"
            : "button";

          console.log(context.interactiveElementProps);

          return (
            <li
              {...context.itemContainerWithChildrenProps}
              style={{
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Container {...context.itemContainerWithoutChildrenProps}>
                <Content {...context.interactiveElementProps}>
                  {arrow}
                  <BsMap />
                  {title}
                </Content>
                <BsPlus
                  style={{ paddingLeft: 10 }}
                  onClick={() => {
                    dataProvider.injectItem(item.index, "New item");
                  }}
                />
              </Container>
              {children}
            </li>
          );
        }}
        renderTreeContainer={({ children, containerProps }) => (
          <div {...containerProps}>{children}</div>
        )}
        renderItemsContainer={({ children, containerProps }) => (
          <ul {...containerProps}>{children}</ul>
        )}
      >
        <Tree treeId="tree-1" rootItem="master" treeLabel="Tree Example" />
      </UncontrolledTreeEnvironment>
    </div>
  );
};
