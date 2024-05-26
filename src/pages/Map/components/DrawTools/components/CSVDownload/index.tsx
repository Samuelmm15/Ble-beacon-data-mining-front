import React from 'react';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { Button } from 'antd';

type CSVDownloadProps = {
  data: any;
};

const CSVDownload = ({ data }: CSVDownloadProps) => {
  const handleDownload = () => {
    // Prepara los datos para la conversión a CSV
    const dataForCSV = data.radarChartData.map((item: any) => ({
      count: data.count,
      averageSpeed: data.averageSpeed,
      ...item
    }));

    const csv = Papa.unparse(dataForCSV);
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'data.csv');
  };

  return <Button onClick={handleDownload}>DownLoad CSV</Button>;
};

export default CSVDownload;
