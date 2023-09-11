import React, { useState, useEffect } from "react";

interface WineData {
  Alcohol: number;
  Ash: number;
  Hue: number;
  Magnesium: number;
  // Add more properties as needed
}

interface ClassStatistics {
  className: number;
  mean: number;
  median: number;
  mode: number;
}

interface GammaStatisticProps {
  wineData: WineData[];
}

function calculateGamma(dataPoint: WineData): number {
  const { Ash, Hue, Magnesium } = dataPoint;
  return (Ash * Hue) / Magnesium;
}

function GammaStatistics({ wineData }: GammaStatisticProps) {
  const [gammaValues, setGammaValues] = useState<number[]>([]);

  useEffect(() => {
    const gammaArray = wineData.map(calculateGamma);
    setGammaValues(gammaArray);
  }, []);

  const calculateClassStatistics = (className: number): ClassStatistics => {
    const classData = wineData.filter((item) => item.Alcohol === className);
    const gammaValuesOfClass = classData.map(calculateGamma);

    const mean =
      gammaValuesOfClass.reduce((acc, value) => acc + value, 0) /
      gammaValuesOfClass.length;

    gammaValuesOfClass.sort((a, b) => a - b);
    const middle = Math.floor(gammaValuesOfClass.length / 2);
    const median =
      gammaValuesOfClass.length % 2 === 0
        ? (gammaValuesOfClass[middle - 1] + gammaValuesOfClass[middle]) / 2
        : gammaValuesOfClass[middle];

    const modeMap: Record<number, number> = {};
    let maxCount = 0;
    let mode: number | null = null;

    gammaValuesOfClass.forEach((value) => {
      if (!modeMap[value]) {
        modeMap[value] = 1;
      } else {
        modeMap[value]++;
      }

      if (modeMap[value] > maxCount) {
        maxCount = modeMap[value];
        mode = value;
      }
    });

    return {
      className,
      mean,
      median,
      mode: mode || 0, // Ensure mode is not null
    };
  };

  const classStatistics: ClassStatistics[] = [1, 2, 3].map((className) =>
    calculateClassStatistics(className)
  );

  return (
    <div>
      <h2>Class-wise Gamma Statistics</h2>

      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th>Measure</th>
            {classStatistics.map((data) => (
              <th key={`header-${data.className}`}>Class {data.className}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Gamma Mean</th>
            {classStatistics.map((data, index) => (
              <td key={`mean-${index}`}>{data.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <th>Gamma Median</th>
            {classStatistics.map((data, index) => (
              <td key={`median-${index}`}>{data.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <th>Gamma Mode</th>
            {classStatistics.map((data, index) => (
              <td key={`mode-${index}`}>{data.mode.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default GammaStatistics;
