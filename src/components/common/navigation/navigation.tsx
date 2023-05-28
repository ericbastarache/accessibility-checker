import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Routes = {
    id: number,
    name: string,
    path: string
};

const routes: Array<Routes> = [
    {
        id: 1,
        name: 'Checker',
        path: '/dashboard/check',
    },
    {
        id: 2,
        name: 'Pages',
        path: '/dashboard/pages'
    },
    {
        id: 3,
        name: 'Reports',
        path: '/dashboard/reports'
    }
];

const Navigation = () => {
    const router = useRouter();
    return (
        <div className="flex-col w-80 p-8 bg-gray-900 h-full">
            <div className="flex-col w-full p-4 border-gray-800 border-b-2 mb-8">
                <Link href="/dashboard" className="text-gray-500">
                    {`{Company / Individual Name}`}
                </Link>
                {/* <h1 className="text-gray-500">{`{Company / Individual Name}`}</h1> */}
            </div>
            <nav className="flex flex-1 flex-col justify-between h-5/6">
                <ul className=" text-white font-bold text-lg p-5 h-5/6">
                    {routes?.map(({ id, path, name }) => (
                        <li
                            className="pb-8"
                            key={id}
                        >
                            <Link
                                className={`hover:text-purple-800 ${router.asPath === path ? 'text-purple-900' : 'text-white'}`}
                                href={path}
                                >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className="flex text-white font-bold text-lg p-5 items-end h-1/3">
                    <li className="cursor-pointer">
                        Logout
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;