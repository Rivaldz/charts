import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to the JSON file in the public directory
    const filePath = path.join(process.cwd(), "public", "data_klinik.json");

    // Read the file synchronously
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse the JSON data
    const jsonData = JSON.parse(fileContents);

    // Object to hold monthly data
    const monthlyData = {};

    // Iterate over each key in the jsonData
    for (const key in jsonData) {
      const dataArray = jsonData[key];

      // Check if the value is an array
      if (Array.isArray(dataArray)) {
        dataArray.forEach((entry) => {
          const date = new Date(entry.Period);
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear().toString().slice(-2); // Ambil 2 digit terakhir dari tahun
          const monthYear = `${month} ${year}`;

          if (year < "26") {
            // Initialize the monthly data if it doesn't exist
            if (!monthlyData[monthYear]) {
              monthlyData[monthYear] = { Revenue: 0, Expense: 0, Comulative: 0 };
            }

            // Sum up Revenue and Expense
            monthlyData[monthYear].Revenue += entry.Revenue; // Positive value
            monthlyData[monthYear].Expense += -Math.abs(entry.Expense); // Negative value
          }
        });
      }
    }

    // Convert the result back to an array of objects in the desired format
    let totalMonth = 0;
    const chartData = Object.keys(monthlyData).map((monthYear) => {
      totalMonth += monthlyData[monthYear].Revenue + monthlyData[monthYear].Expense; // Update totalMonth

      return {
        month: monthYear,
        revenue: monthlyData[monthYear].Revenue,
        expense: monthlyData[monthYear].Expense,
        comulative: totalMonth, // Use the updated totalMonth
        total_revenue_expense:
          monthlyData[monthYear].Revenue + monthlyData[monthYear].Expense,
      };
    });

    return Response.json(chartData); // Mengembalikan data sebagai JSON
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Failed to process data" }, { status: 500 });
  }
}
