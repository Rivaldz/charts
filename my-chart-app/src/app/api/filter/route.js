import fs from "fs";
import path from "path";

export async function POST(req) {
  //console.info("Select Option data", req.json());
  try {
    const { selectedOptions, selectedClinicOptions } = await req.json();
    //console.log(selectedOptions, selectedClinicOptions);

    const filePath = path.join(process.cwd(), "public", "data_klinik.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(fileContents);

    //console.log(selectedClinicOptions);

    const monthlyData = {};
    for (const key in jsonData) {
      const dataArray = jsonData[key];
      if (Array.isArray(dataArray) && selectedClinicOptions.includes(key) ) {
        dataArray.forEach((entry) => {
          const date = new Date(entry.Period);
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear().toString().slice(-2);
          const monthYear = `${month} ${year}`;

          if (year < "26") {
            if (!monthlyData[monthYear]) {
              monthlyData[monthYear] = {
                Revenue: 0,
                Expense: 0,
                Comulative: 0,
              };
            }

            if (selectedOptions.includes(entry.Category)) {
              monthlyData[monthYear].Revenue += entry.Revenue;
              monthlyData[monthYear].Expense += -Math.abs(entry.Expense);
            }
          }
        });
      }
    }

    let totalMonth = 0;
    const chartData = Object.keys(monthlyData).map((monthYear) => {
      totalMonth +=
        monthlyData[monthYear].Revenue + monthlyData[monthYear].Expense;

      return {
        month: monthYear,
        revenue: monthlyData[monthYear].Revenue,
        expense: monthlyData[monthYear].Expense,
        comulative: totalMonth,
        total_revenue_expense:
          monthlyData[monthYear].Revenue + monthlyData[monthYear].Expense,
      };
    });

    return Response.json(chartData);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Failed to process data" }, { status: 500 });
  }
}
