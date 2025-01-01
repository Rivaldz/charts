//import { useEffect, useState } from "react";
import Image from "next/image";
import ChartComponent from '@/components/ui/chartExample';
import ChartPage from "@/components/ChartPage";
import {ProcessKlinikData} from "@/lib/processData";

export default function Home() {
  const data = ProcessKlinikData();
  return (
    <main className="p-8 w-1/2">
      <h1 className="text-2xl font-bold mb-4">Stacked Chart Example</h1>
      <ChartPage chartData={data} /> {/* Mengirim data ke ChartPage */}
<div>
      <h1>Klinik Data by Month</h1>
      </div>
    </main>
  );
}
