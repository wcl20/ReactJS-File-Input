import React from 'react';
import { Provider } from "react-redux";
import FileInput from "./js/components/FileInput.js";
import "./scss/main.scss";
import configureStore from "./js/store";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <FileInput />
      </div>
    </Provider>
  );
}

export default App;
