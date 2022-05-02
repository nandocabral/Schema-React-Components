import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import * as inputJson from "./json/inputs.json";
import SchemaForm from "./components/SchemaForm";

console.log(inputJson);

const App = () => {
  return (
    <ChakraProvider>
      <SchemaForm schema={inputJson} />
    </ChakraProvider>
  );
};

render(React.createElement(App), document.getElementById("root"));
