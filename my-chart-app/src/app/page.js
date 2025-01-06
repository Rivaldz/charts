"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/ui/spinner";
import ChartPage from "@/components/ChartPage";
import ChartPage2 from "@/components/ChartPage2";
import ChartPage3 from "@/components/ChartPage3";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Opsi Checkbox Default
const OPTIONS = [
  "Gross Profit",
  "Debt Repayment",
  "Indirect Expense",
  "Equipment Procurement",
  "Fit Out",
  //"Cumulative Cashflow",
];

//const OPTIONS_CLINIC = ["N21701", "B21702"];

const OPTIONS_CLINIC = [
  "N21701",
  "Q4858",
  "N2511",
  "N21322",
  "NZ9811",
  "Q2222",
  "N20255",
  "N21211",
  "Q4647",
  "N20501",
  "N20652",
  "N21221",
  "N21533",
  "N28555",
  "NZ0611",
  "NZ0618",
  "N2654",
  "N0001",
  "N20022",
  "N21131",
  "N22323",
  "N26166",
  "N2059",
  "N20000",
  "N2892",
  "Q4410",
  "N20221",
  "N2433",
  "Q4601",
  "Q40400",
  "Q4161",
  "Q43353",
  "N20224",
  "Q4587",
  "N21341",
  "NZ2120",
  "NZ2313",
  "NZ21044",
  "N22911",
  "V302994",
  "V31166",
  "V31616",
  "N20761",
  "V3340",
  "NZ10111",
  "NZ4140",
  "N22002",
  "NZ1071",
  "Q4521",
  "N2667",
];

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState(OPTIONS); // Opsi checkbox
  const [selectedClinicOptions, setSelectedClinicOptions] =
    useState(OPTIONS_CLINIC); // Opsi checkbox
  const [chartData, setChartData] = useState([]); // Data chart
  const [loading, setLoading] = useState(false); // State untuk animasi loading

  // Ambil data awal dari API saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Mulai loading
      try {
        const response = await fetch("/api/page");
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false); // Selesai loading
      }
    };
    fetchData();
  }, []);

  // Handler untuk perubahan checkbox
  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((option) => option !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // Handler untuk perubahan checkbox
  const handleCheckboxClinicChange = (event) => {
    const value = event.target.value;
    setSelectedClinicOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((option) => option !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  // const handleSelectClinicChange = (event) => {
  //   const selectedValues = Array.from(
  //     event.target.selectedOptions,
  //     (option) => option.value,
  //   );
  //   setSelectedClinicOptions(selectedValues);
  // };

  // Handler untuk tombol Process
  const handleProcess = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await fetch("/api/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOptions, selectedClinicOptions }),
        //body: JSON.stringify({category:categoryJson, clinic:clinicJson}),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch filtered data");
      }

      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false); // Selesai loading
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stacked Chart Example</h1>
      {loading ? (
        // Tampilkan Spinner saat loading
        <div className="flex justify-center items-center min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <div className="flex items-start w-full">
          <div style={{ width: "65%" }}>
            <ChartPage chartData={chartData} />
            <br />
            <ChartPage2 chartData={chartData} />
            <br />
            <ChartPage3 chartData={chartData} />
          </div>
          <Card style={{ marginLeft: "20px" }}>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent>
              {OPTIONS.map((option) => (
                <div style={{ padding: "5px" }} key={option}>
                  <label>
                    <input
                      style={{ marginRight: "5px" }}
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.includes(option)}
                      onChange={handleCheckboxChange}
                    />
                    {option}
                  </label>
                </div>
              ))}
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <h3>
                  <b>Clinic List</b>
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {OPTIONS_CLINIC.map((option) => (
                    <div style={{ padding: "0" }} key={option}>
                      <label>
                        <input
                          style={{ marginRight: "5px" }}
                          type="checkbox"
                          value={option}
                          checked={selectedClinicOptions.includes(option)}
                          onChange={handleCheckboxClinicChange}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {/* <div style={{ padding: "5px" }}> */}
                {/*   <label className="block text-sm font-medium text-gray-700 mb-2"> */}
                {/*     Select Clinics */}
                {/*   </label> */}
                {/*   <select */}
                {/*     multiple */}
                {/*     value={selectedClinicOptions} */}
                {/*     onChange={handleSelectClinicChange} */}
                {/*     className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" */}
                {/*   > */}
                {/*     {OPTIONS_CLINIC.map((option) => ( */}
                {/*       <option key={option} value={option}> */}
                {/*         {option} */}
                {/*       </option> */}
                {/*     ))} */}
                {/*   </select> */}
                {/* </div> */}
              </div>
              {/* Tombol Process */}
              <div style={{ width: "100%", display: "flex" }}>
                <button
                  onClick={handleProcess}
                  style={{ margin: "0 auto" }}
                  className="text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-md transition-all duration-300"
                >
                  Process
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
