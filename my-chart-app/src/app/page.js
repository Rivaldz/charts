import ChartPage from "@/components/ChartPage";
import ChartPage2 from "@/components/ChartPage2";
import ChartPage3 from "@/components/ChartPage3";
import { ProcessKlinikData } from "@/lib/processData";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const data = ProcessKlinikData();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stacked Chart Example</h1>
      <div style={{ display: 'flex', alignItems: 'flex-start', width: '100vw' }}> {/* Menggunakan Flexbox */}
        <div style={{ width: '50%' }} >
          <ChartPage chartData={data} /> {/* Mengirim data ke ChartPage */}
          <br />
          <ChartPage2 chartData={data} /> {/* Mengirim data ke ChartPage */}
          <br />
          <ChartPage3 chartData={data} /> {/* Mengirim data ke ChartPage */}
        </div>
        <Card style={{ marginLeft: '20px' }}> {/* Tambahkan margin untuk jarak */}
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <input value="Gross Profit" type="checkbox" /> {/* Checkbox */}
              Gross Profit
            </label>
            <br />
            <label>
              <input value="Debt Repayment" type="checkbox" /> {/* Checkbox */}
              Debt Repayment
            </label>
            <br />
            <label>
              <input value="Indirect Expense" type="checkbox" /> {/* Checkbox */}
              Indirect Expense
            </label>
            <br />
            <label>
              <input value="Equipment Procurement" type="checkbox" /> {/* Checkbox */}
              Equipment Procurement
            </label>
            <br />
            <label>
              <input value="Fit Out" type="checkbox" /> {/* Checkbox */}
              Fit Out
            </label>
            <br />
            <label>
              <input value="Cumulative Cashflow" type="checkbox" /> {/* Checkbox */}
              Cumulative Cashflow
            </label>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
