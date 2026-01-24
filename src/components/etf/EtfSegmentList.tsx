import React from 'react';
import { EtfInfo } from '@/lib/etfDataUtils';
import { ExternalLink } from 'lucide-react';

type Props = {
    etfs: EtfInfo[];
    segmentName: string;
};

export const EtfSegmentList: React.FC<Props> = ({ etfs, segmentName }) => {
    if (etfs.length === 0) {
        return (
            <div className="text-center py-6 text-gray-500">
                No ETFs found for {segmentName}.
            </div>
        );
    }

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {etfs.map((etf, idx) => (
                <div
                    key={idx}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow group"
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {etf.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {segmentName}
                            </p>
                        </div>
                        {/* Dummy link as requested */}
                        <a
                            href="#"
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                            title="View Details"
                        >
                            <ExternalLink size={18} />
                        </a>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                        <span className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                            View Details
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
