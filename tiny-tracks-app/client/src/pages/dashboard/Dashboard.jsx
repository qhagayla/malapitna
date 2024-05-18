import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import DummyMonthlyReport from "@/components/lib/constants/mock/monthlyClientReport.json";
import DummyPastClientReport from "@/components/lib/constants/mock/pastClientReport.json";

export default function Dashboard() {
    const [searchText, setSearchText] = useState("");

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    // Filter function to be applied on each row
    const filterRows = (rows) => {
        return rows.filter((row) =>
            Object.values(row).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };

    return (
        <div className="flex flex-col justify-around gap-4">
            <section
                id="monthly-client-report"
                className="flex-col border p-3 rounded-lg w-[60%] shadow-sm"
            >
                <h1 className="text-2xl font-bold mb-5">
                    Monthly Client Report
                </h1>
                <ResponsiveContainer className="min-h-40 md:min-h-80">
                    <BarChart
                        data={DummyMonthlyReport}
                        margin={{ top: 20, right: 0, left: -25, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend className="text-secondary" /> */}
                        <Bar dataKey="Clients" className="fill-accent" />
                    </BarChart>
                </ResponsiveContainer>
            </section>

            {/* DataGrid for clients */}
            <section
                id="past-clients-report"
                className="border p-3 rounded-lg w-[60%]"
            >
                <h1 className="text-2xl font-bold mb-5">Past Clients</h1>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchTextChange}
                        placeholder="Search..."
                        className="px-2 py-1 border rounded-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <DataGrid
                        autoHeight
                        rows={filterRows(DummyPastClientReport)}
                        columns={[
                            { field: "id", headerName: "ID", width: 110 },
                            { field: "name", headerName: "Name", width: 300 },
                            { field: "age", headerName: "Age", width: 110 },
                            {
                                field: "gender",
                                headerName: "Gender",
                                width: 120,
                            },
                        ]}
                        pageSize={5}
                    />
                </div>
            </section>
        </div>
    );
}
