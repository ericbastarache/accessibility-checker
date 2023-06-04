import React, { Fragment } from 'react';
import type { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import DashboardLayout from '@/components/common/layouts/dashboard';
import FileInput from '@/components/file-input/file-input';

const Check = () => {
    return (
        <Fragment>
            <Head>
                <title>A11y Checker | Checker</title>
            </Head>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-row">
                    <div className="flex flex-col flex-1 text-center border rounded-lg border-solid border-gray-200 p-16 h-96 m-5">
                        <FileInput />
                    </div>
                </div>
            </div>  
        </Fragment>
    )
}

Check.getLayout = (page: ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default Check;
