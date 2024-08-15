import {
  Tree,
  TreeNodeTemplateOptions,
  TreeTogglerTemplateOptions,
} from "primereact/tree";
import { TreeNode } from "primereact/treenode";
import { classNames } from "primereact/utils";
import { MdArrowDownward, MdArrowUpward, MdPlusOne } from "react-icons/md";
import { Container, Content } from "../styles";
import { BsMap } from "react-icons/bs";
import { useContext } from "react";
import { MyContext } from "./context";

export const PrimeReact = () => {
  const nodeTemplate = (node: TreeNode, options: TreeNodeTemplateOptions) => {
    const { addItem } = useContext(MyContext);

    return (
      <Container>
        <Content onClick={options.onTogglerClick}>
          <BsMap />
          {node.label}
        </Content>

        <MdPlusOne
          onClick={() => {
            const key = Math.random().toString();
            console.log(key);
            addItem(node.key!.toString(), {
              key: key,
              label: "New Item",
              children: [],
            });
          }}
        />
      </Container>
    );
  };

  const togglerTemplate = (
    node: TreeNode,
    options: TreeTogglerTemplateOptions
  ) => {
    if (!node) {
      return <></>;
    }

    if (options.expanded) return <MdArrowUpward />;
    else return <MdArrowDownward />;
  };

  const { items } = useContext(MyContext);

  console.log(items);

  return (
    <div style={{ width: 300 }}>
      <Tree
        value={items}
        nodeTemplate={nodeTemplate}
        togglerTemplate={togglerTemplate}
        className="w-full md:w-30rem"
      />
    </div>
  );
};
