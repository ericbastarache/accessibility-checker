import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import DashboardLayout from '@/components/common/layouts/dashboard';
import { Report } from '@/types/reports';

type ReportProps = {
    report: Report,
    id: number
}

const COLORS = ['#32C100', '#C12200'];

const Reports = ({ report, id }: ReportProps) => {
    return (
        <Fragment>
            <Head>
                <title>A11y Checker | Report { id } </title>
            </Head>
            <div className="flex flex-col w-full">
                <div className="flex flex-row">
                    <div className="flex flex-col flex-1 text-center border rounded-lg border-solid border-gray-200 p-16 h-96 m-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={report.issueCount}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                >
                                    {report?.issueCount?.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col items-center flex-1 text-center border rounded-lg border-solid border-gray-200 p-16 h-auto m-5">
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Report image" />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col flex-1 text-center border rounded-lg border-solid border-gray-200 p-16 h-auto m-5">
                        <h2 className="font-semibold mb-4">Resolved Issues</h2>
                        <ul className="list-disc">
                            {report?.resolvedIssues?.map(resolved => (
                                <li className="text-green-950 font-semibold list-item" key={resolved.id}>
                                    {resolved.issue}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col flex-1 text-center border rounded-lg border-solid border-gray-200 p-16 h-auto m-5">
                        <h2 className="font-semibold mb-4">Open Issues</h2>
                        <ul className="list-disc">
                            {report?.openIssues?.map(issue => (
                                <li className="text-red-950 font-semibold list-item" key={issue.id}>
                                    {issue.issue}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

Reports.getLayout = (page: ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context?.params?.id;
    const response = await fetch(`http://localhost:3000/api/reports/${id}`);
    const { data } = await response.json();

    return {
        props: {
            report: data.report,
            id: data.report.id
        }
    }
};

export default Reports;