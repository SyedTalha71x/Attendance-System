import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

export default function Homepage() {
    const { isLoading, error, data, getData } = useVisitorData(
        { extendedResult: true },
        { immediate: true }
    );

    return (
        <div className='flex justify-center items-center flex-col h-96 w-full'>
            <button className='bg-purple-600 text-white py-2 px-10 text-center' onClick={() => getData({ ignoreCache: true })}>
                Reload data
            </button>
            <p className='mt-[18%]'>VisitorId: {isLoading ? 'Loading...' : data?.visitorId}</p>
            <p>Full visitor data:</p>
            <pre>{error ? error.message : JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
