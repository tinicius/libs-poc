import FolderTree, { testData } from "react-folder-tree";

export const ReactFolderTree = () => {
  return (
    <FolderTree
      data={testData}
      onChange={(state, event) => console.log(state, event)}
    />
  );
};
