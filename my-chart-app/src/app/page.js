"use client";

import { useState, useEffect } from "react";
import Spinner from "@/components/ui/spinner";
import ChartPage from "@/components/ChartPage";
import ChartPage2 from "@/components/ChartPage2";
import ChartPage3 from "@/components/ChartPage3";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Opsi Checkbox Default
const OPTIONS = [
  "Gross Profit",
  "Debt Repayment",
  "Indirect Expense",
  "Equipment Procurement",
  "Fit Out",
  "Cumulative Cashflow",
];

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState(OPTIONS);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false); // State untuk loading animasi

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

  // Update chartData setiap kali selectedOptions berubah
  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true); // Mulai loading
      try {
        const response = await fetch("/api/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedOptions }),
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

    fetchFilteredData();
  }, [selectedOptions]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stacked Chart Example</h1>
      {loading ? (
        // Tampilkan Spinner saat loading
        <div className="flex justify-center items-center min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "flex-start", width: "100vw" }}>
          <div style={{ width: "50%" }}>
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
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
