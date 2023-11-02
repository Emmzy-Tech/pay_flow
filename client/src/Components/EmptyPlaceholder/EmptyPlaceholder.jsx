import React from 'react';
import { Empty } from 'antd';
const EmptyPlaceholder = () => {
    return (
        <div className="w-full flex justify-center items-center h-full">
            <Empty className=''/>;
        </div>
    )
}
export default EmptyPlaceholder;