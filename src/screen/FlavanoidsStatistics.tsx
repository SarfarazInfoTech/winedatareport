import React from "react";

interface AppState {
  wineData: {
    Alcohol: number;
    Flavanoids: number;
  }[];
}

class FlavanoidsStatistics extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      wineData: props.wineData,
    };
  }

  // Function to calculate the mean of an array
  calculateMean = (arr: number[]): number => {
    const sum = arr.reduce(
      (total, value) => total + parseFloat(value.toString()),
      0
    );
    return sum / arr.length;
  };

  // Function to calculate the median of an array
  calculateMedian = (arr: number[]): number => {
    const sortedArr = arr
      .slice()
      .sort((a, b) => parseFloat(a.toString()) - parseFloat(b.toString()));
    const middle = Math.floor(sortedArr.length / 2);

    if (sortedArr.length % 2 === 0) {
      return (
        (parseFloat(sortedArr[middle - 1].toString()) +
          parseFloat(sortedArr[middle].toString())) /
        2
      );
    } else {
      return parseFloat(sortedArr[middle].toString());
    }
  };

  // Function to calculate the mode of an array
  calculateMode = (arr: number[]): string => {
    const frequencyMap: { [key: string]: number } = {};

    arr.forEach((value) => {
      const key = value.toString();
      if (frequencyMap[key]) {
        frequencyMap[key]++;
      } else {
        frequencyMap[key] = 1;
      }
    });

    let mode: string[] = [];
    let maxFrequency = 0;

    for (const key in frequencyMap) {
      if (frequencyMap[key] > maxFrequency) {
        mode = [key];
        maxFrequency = frequencyMap[key];
      } else if (frequencyMap[key] === maxFrequency) {
        mode.push(key);
      }
    }

    return mode.join(", ");
  };

  render() {
    // Extract the "Flavanoids" values and corresponding "Alcohol" class
    const flavanoidsData = this.state.wineData.map((wine) => ({
      alcoholClass: wine.Alcohol,
      flavanoids: wine.Flavanoids,
    }));

    // Group the data by class
    const groupedData: { [key: string]: number[] } = {};

    flavanoidsData.forEach((wine) => {
      const key = wine.alcoholClass.toString();
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(wine.flavanoids);
    });

    // Calculate statistics for each class
    const statistics: JSX.Element[] = [];
    const arrayClass: JSX.Element[] = [];
    const arrayMean: JSX.Element[] = [];
    const arrayMedian: JSX.Element[] = [];
    const arrayMode: JSX.Element[] = [];

    for (const alcoholClass in groupedData) {
      const flavanoidsValues = groupedData[alcoholClass];

      arrayClass.push(
        <th key={`class-${alcoholClass}`}>Class {alcoholClass}</th>
      );
    }

    for (const alcoholClass in groupedData) {
      const flavanoidsValues = groupedData[alcoholClass];
      const mean = this.calculateMean(flavanoidsValues);

      arrayMean.push(<td key={`mean-${alcoholClass}`}>{mean.toFixed(3)}</td>);
    }

    for (const alcoholClass in groupedData) {
      const flavanoidsValues = groupedData[alcoholClass];
      const median = this.calculateMedian(flavanoidsValues);

      arrayMedian.push(
        <td key={`median-${alcoholClass}`}>{median.toFixed(3)}</td>
      );
    }

    for (const alcoholClass in groupedData) {
      const flavanoidsValues = groupedData[alcoholClass];
      const mode = this.calculateMode(flavanoidsValues);

      arrayMode.push(<td key={`mode-${alcoholClass}`}>{mode}</td>);
    }

    return (
      <div>
        <h2>Class-wise Flavanoids Statistics</h2>
        <table style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              <th>Measure</th>
              {arrayClass}
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Flavanoids Mean</th>
              {arrayMean}
            </tr>
            <tr>
              <th>Flavanoids Median</th>
              {arrayMedian}
            </tr>
            <tr>
              <th>Flavanoids Mode</th>
              {arrayMode}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default FlavanoidsStatistics;
