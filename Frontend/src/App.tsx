import { useState, useEffect } from "react";
import { Bar, Doughnut, Line, Scatter, PolarArea, Radar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header";

Chart.register(...registerables);

interface IDataItem {
  _id: string;
  end_year: string;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
  swot: string;
}

const Charts = () => {
  const { data, darkMode } = useTheme();
  const [endYearFilter, setEndYearFilter] = useState<string>("");
  const [topicFilter, setTopicFilter] = useState<string>("");
  const [sectorFilter, setSectorFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [pestFilter, setPestFilter] = useState<string>("");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [swotFilter, setSwotFilter] = useState<string>("");
  const [countryFilter, setCountryFilter] = useState<string>("");

  const [filteredData, setFilteredData] = useState<IDataItem[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(
        (data as IDataItem[]).filter((item: IDataItem) => {
          return (
            (item.end_year === endYearFilter || !endYearFilter) &&
            (item.topic === topicFilter || !topicFilter) &&
            (item.sector === sectorFilter || !sectorFilter) &&
            (item.region === regionFilter || !regionFilter) &&
            (item.pestle === pestFilter || !pestFilter) &&
            (item.source === sourceFilter || !sourceFilter) &&
            (item.swot === swotFilter || !swotFilter) &&
            (item.country === countryFilter || !countryFilter)
          );
        })
      );
    }
  }, [
    data,
    endYearFilter,
    topicFilter,
    sectorFilter,
    regionFilter,
    pestFilter,
    sourceFilter,
    swotFilter,
    countryFilter,
  ]);

  if (!data) {
    return (
      <div
        className={`flex justify-center items-center h-screen text-2xl font-semibold  ${
          darkMode ? "text-white bg-slate-950" : "text-gray-800 bg-white"
        }`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  // Bar chart data
  const barChartData = {
    labels: filteredData.map((item) => item.start_year || "Unknown"),
    datasets: [
      {
        label: "Intensity",
        data: filteredData.map((item) => item.intensity),
        backgroundColor: "rgba(75, 192, 192)",
      },
      {
        label: "Likelihood",
        data: filteredData.map((item) => item.likelihood),
        backgroundColor: "rgba(255, 99, 132)",
      },
      {
        label: "Relevance",
        data: filteredData.map((item) => item.relevance),
        backgroundColor: "rgba(54, 162, 235)",
      },
    ],
  };

  // Doughnut chart data
  const doughnutChartData = {
    labels: [...new Set(filteredData.map((item) => item.country))],
    datasets: [
      {
        data: filteredData
          .reduce((acc, item) => {
            const index = acc.findIndex((obj) => obj.country === item.country);
            if (index === -1) {
              acc.push({ country: item.country, count: 1 });
            } else {
              acc[index].count++;
            }
            return acc;
          }, [] as { country: string; count: number }[])
          .map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  };

  // Line chart data
  const lineChartData = {
    labels: filteredData.map((item) => item.start_year || "Unknown"),
    datasets: [
      {
        label: "Intensity",
        data: filteredData.map((item) => item.intensity),
        fill: false,
        borderColor: "rgba(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Likelihood",
        data: filteredData.map((item) => item.likelihood),
        fill: false,
        borderColor: "rgba(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "Relevance",
        data: filteredData.map((item) => item.relevance),
        fill: false,
        borderColor: "rgba(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  // Scatter chart data
  const scatterChartData = {
    datasets: [
      {
        label: "Intensity vs Relevance",
        data: filteredData.map((item) => ({
          x: item.intensity,
          y: item.relevance,
        })),
        backgroundColor: "rgba(255, 99, 132)",
      },
    ],
  };

  // Polar area chart data
  const polarAreaChartData = {
    labels: [...new Set(filteredData.map((item) => item.topic))],
    datasets: [
      {
        data: filteredData
          .reduce((acc, item) => {
            const index = acc.findIndex((obj) => obj.topic === item.topic);
            if (index === -1) {
              acc.push({ topic: item.topic, count: 1 });
            } else {
              acc[index].count++;
            }
            return acc;
          }, [] as { topic: string; count: number }[])
          .map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  };

  // Radar chart data
  const radarChartData = {
    labels: [...new Set(filteredData.map((item) => item.region))],
    datasets: [
      {
        data: filteredData
          .reduce((acc, item) => {
            const index = acc.findIndex((obj) => obj.region === item.region);
            if (index === -1) {
              acc.push({ region: item.region, count: 1 });
            } else {
              acc[index].count++;
            }
            return acc;
          }, [] as { region: string; count: number }[])
          .map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  };

  // Pie chart data
  const pieChartData = {
    labels: [...new Set(filteredData.map((item) => item.sector))],
    datasets: [
      {
        data: filteredData
          .reduce((acc, item) => {
            const index = acc.findIndex((obj) => obj.sector === item.sector);
            if (index === -1) {
              acc.push({ sector: item.sector, count: 1 });
            } else {
              acc[index].count++;
            }
            return acc;
          }, [] as { sector: string; count: number }[])
          .map((item) => item.count),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
      },
    ],
  };
  return (
    <div
      className={`flex min-h-screen  ${
        darkMode
          ? "text-white border-b border-slate-800 bg-slate-950"
          : "border-b-2 text-gray-800 bg-white"
      }`}
    >
      <Header />
      <div className="lg:flex w-full lg:px-10  lg:mt-28 mt-[17%]  mb-20">
        <div
          className={`lg:fixed flex lg:py-0 py-5 lg:px-0 px-4  ${
            darkMode ? "bg-slate-950 text-white" : "bg-white text-gray-800"
          } lg:flex-col min-w-[20%] flex-wrap gap-3`}
        >
          <label className="flex flex-col">
            End Year:
            <select
              value={endYearFilter}
              onChange={(e) => setEndYearFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.end_year))].map((year) => (
                <option key={year} value={year}>
                  {year || "Unknown"}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            Topic:
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.topic))].map((topic) => (
                <option key={topic} value={topic}>
                  {topic || "Unknown"}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            Sector:
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.sector))].map((sector) => (
                <option key={sector} value={sector}>
                  {sector || "Unknown"}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            Region:
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.region))].map((region) => (
                <option key={region} value={region}>
                  {region || "Unknown"}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            PEST:
            <select
              value={pestFilter}
              onChange={(e) => setPestFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.pestle))].map((pest) => (
                <option key={pest} value={pest}>
                  {pest || "Unknown"}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            Source:
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.source))].map((source) => (
                <option key={source} value={source}>
                  {source || "Unknown"}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            SWOT:
            <select
              value={swotFilter}
              onChange={(e) => setSwotFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.swot))].map((swot) => (
                <option key={swot} value={swot}>
                  {swot || "Unknown"}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col">
            Country:
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className={`border rounded-md p-2 ${
                darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"
              }`}
            >
              <option value="">All</option>
              {[...new Set(data.map((item) => item.country))].map((country) => (
                <option key={country} value={country}>
                  {country || "Unknown"}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div
          className={`lg:flex px-4 flex-wrap w-full lg:gap-24 gap-10 lg:mt-0 justify-end text-lg ${
            darkMode ? "bg-slate-950 text-white" : "bg-white text-gray-800"
          }`}
        >
          <div className="lg:w-9/12 lg:space-y-20 space-y-7 items-center">
            <div className="chart-section">
              <h2
                className={`text-2xl font-bold my-4 ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Intensity, Likelihood, and Relevance over Time
              </h2>
              <Bar data={barChartData} />
            </div>

            <div className="flex lg:flex-row flex-col lg:space-x-10 w-full items-center lg:space-y-0 space-y-7">
              <div className="chart-section lg:w-5/12">
                <h2
                  className={`text-2xl font-bold my-4 ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  Distribution of Data by Country
                </h2>
                <Doughnut data={doughnutChartData} />
              </div>

              <div className="chart-section lg:w-5/12">
                <h2
                  className={`text-2xl font-bold my-4 ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  Distribution of Topics
                </h2>
                <PolarArea data={polarAreaChartData} />
              </div>
            </div>

            <div className="chart-section">
              <h2
                className={`text-2xl font-bold my-4 ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Intensity, Likelihood, and Relevance Trends
              </h2>
              <Line data={lineChartData} />
            </div>

            <div className="chart-section">
              <h2
                className={`text-2xl font-bold my-4 ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Intensity vs Relevance
              </h2>
              <Scatter
                data={scatterChartData}
                options={{
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Intensity",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Relevance",
                      },
                    },
                  },
                }}
              />
            </div>

            <div className="flex lg:flex-row flex-col lg:space-x-10 lg:space-y-0 space-y-6 w-full items-center ">
              <div className="chart-section lg:w-5/12">
                <h2
                  className={`text-2xl font-bold my-4 ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  Region Distribution
                </h2>
                <Radar data={radarChartData} />
              </div>

              <div className="chart-section lg:w-5/12">
                <h2
                  className={`text-2xl font-bold my-4 ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  Distribution of Sectors
                </h2>
                <Pie data={pieChartData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
