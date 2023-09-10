import React from "react";
import wineData from "../data/Wine-Data.json";
import FlavanoidsStatistics from "../screen/FlavanoidsStatistics.tsx";
import GammaStatistics from "../screen/GammaStatistics.tsx";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <FlavanoidsStatistics wineData={wineData} />
        <GammaStatistics wineData={wineData} />
      </React.Fragment>
    );
  }
}

export default App;
