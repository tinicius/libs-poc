import { Muix } from "./muix";
import { MyContextProvider } from "./muix/context";
import { MyContextProvider as Provider2 } from "./prime-react/context";
import { PrimeReact } from "./prime-react";
import { ReactComplexTree } from "./react-complex-tree";
import { ReactFolderTree } from "./react-folder-tree";
import "react-folder-tree/dist/style.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { PrimeReactProvider } from "primereact/api";
import { ReactFolder } from "./react-folder";

function App() {
  // return <ReactComplexTree />;
  // return <ReactFolderTree />;
  return (
    <>
      <MyContextProvider>
        <Muix />
      </MyContextProvider>

      <br />
      <br />
      <br />

      <ReactComplexTree />

      <br />
      <br />
      <br />

      <PrimeReactProvider>
        <Provider2>
          <PrimeReact />
        </Provider2>
      </PrimeReactProvider>

      <br />
      <br />
      <br />

      {/* <ReactFolder /> */}
    </>
  );
}

export default App;
