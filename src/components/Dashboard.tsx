import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { initialData } from '../data';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const [sheetUrl, setSheetUrl] = useState('');

  // Count courses by type
  const courseTypeData = data.reduce((acc, curr) => {
    const type = curr['ประเภทหลักสูตร'] || 'ไม่ระบุ';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(courseTypeData).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Course Training Dashboard</h1>
      
      <div className="mb-6">
        <input
          type="text"
          value={sheetUrl}
          onChange={(e) => setSheetUrl(e.target.value)}
          placeholder="Paste Google Sheet Publish URL here (CSV format)"
          className="w-full p-2 border border-slate-300 rounded-md"
        />
        <p className="text-sm text-slate-500 mt-1">Note: Real-time fetching requires a CSV-published URL.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Courses by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Course List</h2>
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100">
            <tr>
              <th className="px-4 py-3">รหัส</th>
              <th className="px-4 py-3">ชื่อหลักสูตร</th>
              <th className="px-4 py-3">วิทยากร</th>
              <th className="px-4 py-3">วันที่</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, index) => (
              <tr key={index} className="bg-white border-b border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{course['รหัสหลักสูตร']}</td>
                <td className="px-4 py-3">{course['ชื่อหลักสูตร']}</td>
                <td className="px-4 py-3">{course['วิทยากร']}</td>
                <td className="px-4 py-3">{course['ว ด ป']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
