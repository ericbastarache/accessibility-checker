import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import type { Pages as PageType } from '@/types/pages';
import Head from 'next/head';
import DashboardLayout from '@/components/common/layouts/dashboard';

type PagesProps = {
    pages: Array<PageType>
}

const Pages = ({ pages }: PagesProps) => {
    return (
        <Fragment>
            <Head>
                <title>A11y Checker | Checker</title>
            </Head>
            <div className="flex flex-col w-full">
                <div className="flex flex-row">
                    <div className="flex flex-col flex-1 text-center h-full m-5">
                        <h2 className="flex justify-start font-semibold text-2xl pl-0 p-4">Pages</h2>
                        <table className="border border-solid border-gray-300">
                            <thead>
                                <tr className="border border-solid border-gray-300">
                                    <th className="p-8 border border-r-gray-300">Page ID</th>
                                    <th className="p-8 border border-r-gray-300">Page URL</th>
                                    <th className="p-8">Issue Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages?.map(({ id, page, issues}: PageType, idx: number) => (
                                    <tr className={`border border-solid border-gray-400 ${idx % 2 === 0 && 'bg-yellow-50'}`} key={id}>
                                        <td className="border border-r-gray-300 p-8">{id}</td>
                                        <td className="border border-r-gray-300 p-8">{page}</td>
                                        <td className="border border-r-gray-300 p-8">{issues}</td>
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

Pages.getLayout = (page: ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await fetch('http://localhost:3000/api/pages');
    const { data } = await response.json();

    return {
        props: {
            pages: data.pages
        }
    }
};

export default Pages;