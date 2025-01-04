//import { useEffect, useState } from "react";
import Image from "next/image";
import ChartComponent from '@/components/ui/chartExample';
import ChartPage from "@/components/ChartPage";
import ChartPage2 from "@/components/ChartPage2";
import { ProcessKlinikData } from "@/lib/processData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const data = ProcessKlinikData();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Stacked Chart Example</h1>
      <div style={{ display: 'flex', alignItems: 'flex-start', width: '100vw' }}> {/* Menggunakan Flexbox */}
        <div style={{width: '50%'}} >
          <ChartPage chartData={data} /> {/* Mengirim data ke ChartPage */}
          <br/>
          <ChartPage2 chartData={data} /> {/* Mengirim data ke ChartPage */}
        </div>
        <Card style={{ marginLeft: '20px' }}> {/* Tambahkan margin untuk jarak */}
          <CardHeader>
            <CardTitle>Options</CardTitle>
          </CardHeader>
          <CardContent>
            <label>
              <input type="checkbox" /> {/* Checkbox */}
              Gross Profit
            </label>
            <br />
            <label>
              <input type="checkbox" /> {/* Checkbox */}
              Debt Repayment
            </label>
            <br />
            <label>
              <input type="checkbox" /> {/* Checkbox */}
              Indirect Expense
            </label>
            <br />
            <label>
              <input type="checkbox" /> {/* Checkbox */}
              Equipment Procurement
            </label>
            <br />
            <label>
              <input type="checkbox" /> {/* Checkbox */}
              Fit Out
            </label>
            <br />
            <label>
              <input type="checkbox" /> {/* Checkbox */}
              Cumulative Cashflow
            </label>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
