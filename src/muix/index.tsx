import { Avatar, Box, styled } from "@mui/material";
import { BsMap } from "react-icons/bs";
import { MdArrowDownward, MdArrowUpward, MdPlusOne } from "react-icons/md";
import {
  RichTreeView,
  SimpleTreeView,
  TreeItem,
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2Icon,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Provider,
  TreeItem2Root,
  TreeItemProps,
  TreeViewBaseItem,
  UseTreeItem2Parameters,
  useTreeViewApiRef,
} from "@mui/x-tree-view";
import { TreeItem2DragAndDropOverlay } from "@mui/x-tree-view/TreeItem2DragAndDropOverlay";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2/useTreeItem2";
import React, { useContext, useRef, useState } from "react";
import { Container, Content } from "../styles";
import { MyContext } from "./context";

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
}));

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}

const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>
) {
  const { addItem } = useContext(MyContext);

  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const contentProps = getContentProps(other);

  return (
    <TreeItem2Provider itemId={itemId}>
      <Container>
        <Content onClick={contentProps.onClick}>
          {contentProps.status.expandable &&
            (contentProps.status.expanded ? (
              <MdArrowUpward />
            ) : (
              <MdArrowDownward />
            ))}
          <BsMap />
          {label}
        </Content>

        <MdPlusOne
          onClick={() =>
            addItem(itemId, {
              id: Math.random().toString(),
              label: "New ",
              children: [],
            })
          }
        />
      </Container>

      {children && <TreeItem2GroupTransition {...getGroupTransitionProps()} />}
    </TreeItem2Provider>
  );

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <CustomTreeItemContent {...getContentProps()}>
          {/* Arrow */}
          {/* <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer> */}
          A
          {/* <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            <Avatar
              sx={(theme) => ({
                background: theme.palette.primary.main,
                width: 24,
                height: 24,
                fontSize: "0.8rem",
              })}
            >
              {(label as string)[0]}
            </Avatar>
            <TreeItem2Checkbox {...getCheckboxProps()} />
            <TreeItem2Label {...getLabelProps()} />
          </Box> */}
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>

        {children && (
          <TreeItem2GroupTransition {...getGroupTransitionProps()} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

export const Muix = () => {
  const apiRef = useTreeViewApiRef();

  const { items } = useContext(MyContext);

  return (
    <Box sx={{ width: 265 }}>
      <RichTreeView
        items={items}
        ref={apiRef as any}
        slots={{
          item: CustomTreeItem,
        }}
      />
    </Box>
  );
};
