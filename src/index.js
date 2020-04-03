import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { RegionDetail } from "./views";

import { Block, Frame, MainMenu } from "@istreamplanet/pebble";

import "@istreamplanet/pebble/dist/Styles/foundation.scss";
import "./styles.scss";

import { AUX_MENU, MENU } from "./demo/mainmenu";

function App() {
  const mainMenu = (
    <MainMenu title="iStreamPlanet" menu={MENU} auxMenu={AUX_MENU} />
  );

  return (
    <BrowserRouter>
      <Frame
        navigation={mainMenu}
        tenantName="iStreamPlanet"
        title="iStreamPlanet"
      >
        <Block width="100%" direction="column" oveflow="auto">
          <Switch>
            <Route path="/regions/:id" exact component={RegionDetail} />
          </Switch>
        </Block>
      </Frame>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
