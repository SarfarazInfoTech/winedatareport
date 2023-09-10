import React from "react";
import wineData from "../data/Wine-Data.json";
import FlavanoidsStatistics from "../screen/FlavanoidsStatistics.tsx";
import GammaStatistics from "../screen/GammaStatistics.tsx";

class App extends React.Component {
  render() {
    return (
      <div>
        <FlavanoidsStatistics wineData={wineData} />
        <GammaStatistics wineData={wineData} />
      </div>
    );
  }
}

export default App;
