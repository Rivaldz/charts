import fs from 'fs';
import path from 'path';

export function ProcessKlinikData() {
  // Path to the JSON file in the public directory
  const filePath = path.join(process.cwd(), 'public', 'data_klinik.json');
  
  // Read the file synchronously
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse the JSON data
  const jsonData = JSON.parse(fileContents);

  // Object to hold monthly data
  const monthlyData = {};

  // Iterate over each key in the jsonData
  for (const key in jsonData) {
    const dataArray = jsonData[key];

    // Check if the value is an array
    if (Array.isArray(dataArray)) {
      dataArray.forEach(entry => {
        const date = new Date(entry.Period);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2); // Ambil 2 digit terakhir dari tahun
        const monthYear = `${month} ${year}`;

        // Initialize the monthly data if it doesn't exist
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = { Revenue: 0, Expense: 0 };
        }

        // Sum up Revenue and Expense
        monthlyData[monthYear].Revenue += entry.Revenue;
        monthlyData[monthYear].Expense += entry.Expense;
      });
    }
  }

  // Convert the result back to an array of objects in the desired format
  const chartData = Object.keys(monthlyData).map(monthYear => ({
    month: monthYear,
    revenue: monthlyData[monthYear].Revenue,
    expense: monthlyData[monthYear].Expense,
  }));

  return chartData;
}
