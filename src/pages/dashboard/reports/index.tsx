import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import DashboardLayout from '@/components/common/layouts/dashboard';
import { Report, Issues } from '@/types/reports';

type ReportsProps = {
    reports: Array<Report>
}

const Reports = ({ reports }: ReportsProps) => {
    return (
        <Fragment>
            <Head>
                <title>A11y Checker | Reports</title>
            </Head>
            <div className="flex flex-col w-full">
                <div className="flex flex-row">
                    <div className="flex flex-col flex-1 text-center h-auto m-5">
                        <h2 className="flex justify-start font-semibold text-2xl pl-0 p-4">Reports</h2>
                        <table className="border border-solid border-gray-300">
                            <thead>
                                <tr className="border border-solid border-gray-300">
                                    <th className="p-8 border border-r-gray-300">Report ID</th>
                                    <th className="p-8 border border-r-gray-300">Page</th>
                                    <th className="p-8 border border-r-gray-300">Image</th>
                                    <th className="p-8">Issues</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports?.map((report: Report, idx: number) => (
                                    <tr className={`border border-solid border-gray-400 ${idx % 2 === 0 && 'bg-yellow-50'}`} key={report.id}>
                                        <td className="border border-r-gray-300 p-8">
                                            <Link className="underline text-blue-500" href={`/dashboard/reports/${report.id}`}>{report.id}</Link>
                                        </td>
                                        <td className="border border-r-gray-300 p-8">{report.page}</td>
                                        <td className="border border-r-gray-300 p-8">
                                            <Image alt={`Image of report ${report.id}`} src="https://placehold.co/50x50.png" width={50} height={50} />
                                        </td>
                                        <td className="border border-r-gray-300 p-8">
                                            <ul className="list-disc">
                                                {report?.issues?.map(({ id: issueRef, issue, issueId }: Issues) => (
                                                    <li className="list-item" key={issueRef}>
                                                        <span>{issue}</span>
                                                        <span>{issueId}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        </Fragment>
    )
}

Reports.getLayout = (page: ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
)

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const response = await fetch('http://localhost:3000/api/reports');
    const { data } = await response.json();

    return {
        props: {
            reports: data.reports
        }
    }
};

export default Reports;