import React, { Component } from "react";

interface WineStatisticState {
  wineData: {
    Ash: number;
    Hue: number;
    Magnesium: number;
  }[];
  gammaData: {
    index: number;
    gamma: number;
    mean: number;
    median: number;
    mode: number;
  }[];
}

class GammaStatistics extends Component<{}, WineStatisticState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      wineData: props.wineData,
      gammaData: [],
    };
  }

  componentDidMount() {
    // Calculate Gamma for each data point
    const gammaData = this.state.wineData.map((point, index) => {
      const { Ash, Hue, Magnesium } = point;
      const gamma = (Ash * Hue) / Magnesium;
      return { index, gamma, mean: 0, median: 0, mode: 0 };
    });

    // Calculate class-wise mean, median, and mode of Gamma
    const classWiseGamma = {};
    gammaData.forEach((point) => {
      if (!classWiseGamma[point.index]) {
        classWiseGamma[point.index] = [];
      }
      classWiseGamma[point.index].push(point.gamma);
    });

    const classStats = [];
    for (const index in classWiseGamma) {
      const gammaValues = classWiseGamma[index];
      const mean =
        gammaValues.reduce((sum, val) => sum + val, 0) / gammaValues.length;
      const sortedValues = gammaValues.sort((a, b) => a - b);
      const median =
        gammaValues.length % 2 === 0
          ? (sortedValues[gammaValues.length / 2 - 1] +
              sortedValues[gammaValues.length / 2]) /
            2
          : sortedValues[Math.floor(gammaValues.length / 2)];
      const modeMap = {};
      let mode = sortedValues[0];
      let maxCount = 1;
      for (let i = 0; i < gammaValues.length; i++) {
        const value = sortedValues[i];
        if (modeMap[value]) {
          modeMap[value]++;
          if (modeMap[value] > maxCount) {
            mode = value;
            maxCount = modeMap[value];
          }
        } else {
          modeMap[value] = 1;
        }
      }
      classStats.push({
        index: parseInt(index),
        mean,
        median,
        mode,
      });
    }

    // Update state with Gamma data and class-wise statistics
    this.setState({ gammaData: classStats });
  }

  render() {
    const { gammaData } = this.state;

    return (
      <div>
        <h2>Class-wise Gamma Statistics</h2>

        <table style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              <th>Measure</th>
              {gammaData.map((data) => (
                <th key={`header-${data.index + 1}`}>Class {data.index + 1}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Flavanoids Mean</th>
              {gammaData.map((data) => (
                <td key={`mean-${data.index}`}>{data.mean.toFixed(3)}</td>
              ))}
            </tr>
            <tr>
              <th>Flavanoids Median</th>
              {gammaData.map((data) => (
                <td key={`median-${data.index}`}>{data.median.toFixed(3)}</td>
              ))}
            </tr>
            <tr>
              <th>Flavanoids Mode</th>
              {gammaData.map((data) => (
                <td key={`mode-${data.index}`}>{data.mode.toFixed(3)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default GammaStatistics;
