import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RelatedPapersDemo = ({ papers }) => {
    const [showChart, setShowChart] = useState(true);
    const [expandedPaper, setExpandedPaper] = useState(null);

    // Normalize to 0–100%
    const normalizeRelevance = (value) => Math.min(value, 100);

    // Prepare chart data
    const prepareChartData = () => {
        const paperLabels = papers.map((paper, idx) => {
            const shortTitle = paper.title.length > 10 ? paper.title.substring(0, 10) + '...' : paper.title;
            return shortTitle;
        });

        return [
            {
                name: 'Title Relevance',
                ...papers.reduce((acc, paper, index) => {
                    acc[paperLabels[index]] = normalizeRelevance(paper.relevance_title);
                    return acc;
                }, {})
            },
            {
                name: 'Keywords Relevance',
                ...papers.reduce((acc, paper, index) => {
                    acc[paperLabels[index]] = normalizeRelevance(paper.relevance_keywords);
                    return acc;
                }, {})
            },
            {
                name: 'Summary Relevance',
                ...papers.reduce((acc, paper, index) => {
                    acc[paperLabels[index]] = normalizeRelevance(paper.relevance_summary);
                    return acc;
                }, {})
            }
        ];
    };

    // Colors
    const colorMap = {
        title: 'bg-blue-600',
        keywords: 'bg-yellow-500',
        summary: 'bg-green-600'
    };

    // Custom Tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const paperTitle = payload[0].name;
            const paper = papers.find(p =>
                p.title.startsWith(paperTitle.replace('...', ''))
            );

            if (paper) {
                return (
                    <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
                        <p className="font-medium text-sm mb-1">{paper.title}</p>
                        <p className="text-xs text-gray-500">{paper.authors}</p>
                        <div className="mt-2 pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-600">{label}: <span className="font-medium">{normalizeRelevance(payload[0].value).toFixed(1)}%</span></p>
                        </div>
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Related Papers</h2>

                <button
                    onClick={() => setShowChart(!showChart)}
                    className="flex items-center space-x-1 text-sm bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-purple-300 transition-all text-gray-700 hover:text-purple-700 hover:shadow-sm"
                >
                    <BarChart2 size={16} />
                    <span>{showChart ? 'Hide Comparison' : 'Compare Papers'}</span>
                </button>
            </div>

            {showChart && (
                <div className="bg-white p-4 rounded-lg mb-5 border border-gray-200 shadow-sm transition-all duration-300 ease-in-out">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Relevance Comparison</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={prepareChartData()} barGap={2} barSize={15}>
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ paddingTop: 15 }} />
                            {papers.map((paper, index) => {
                                const shortTitle = paper.title.length > 10 ?
                                    paper.title.substring(0, 10) + '...' :
                                    paper.title;

                                return (
                                    <Bar
                                        key={index}
                                        dataKey={shortTitle}
                                        name={shortTitle}
                                        fill={`hsl(${(index * 40) + 200}, 70%, 55%)`}
                                        radius={[4, 4, 0, 0]}
                                    />
                                );
                            })}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            <div className="space-y-4">
                {papers.map((paper, index) => {
                    const title = normalizeRelevance(paper.relevance_title);
                    const keywords = normalizeRelevance(paper.relevance_keywords);
                    const summary = normalizeRelevance(paper.relevance_summary);
                    const overallRelevance = Math.round((title + keywords + summary) / 3);
                    const isExpanded = expandedPaper === index;

                    return (
                        <div
                            key={index}
                            onClick={() => setExpandedPaper(isExpanded ? null : index)}
                            className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 line-clamp-1">{paper.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{paper.authors ?? "Manoj, Saugat and Fxing"}</p>
                                    </div>
                                    <div className="flex flex-col items-end ml-4">
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                                            {overallRelevance}% match
                                        </span>
                                        <div className="mt-2 text-xs text-gray-500 flex items-center">
                                            {isExpanded ? <>Less detail <ChevronUp size={14} className="ml-1" /></> : <>More detail <ChevronDown size={14} className="ml-1" /></>}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { label: 'Title', value: title, color: colorMap.title },
                                                { label: 'Keywords', value: keywords, color: colorMap.keywords },
                                                { label: 'Summary', value: summary, color: colorMap.summary }
                                            ].map((item, i) => (
                                                <div key={i} className="flex flex-col">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-xs font-medium text-gray-700">{item.label}</span>
                                                        <span className="text-xs font-medium text-gray-700">{item.value.toFixed(0)}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                                                            style={{ width: `${item.value}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-3 pt-2 border-t border-gray-100">
                                            <p className="text-sm text-gray-700 line-clamp-3">
                                                {paper.abstract ?? "Please Fix This Manoj add abstract few lines"}
                                            </p>
                                        </div>

                                        <div className="flex justify-end mt-3">
                                            <button
                                                className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    console.log(`View full paper: ${paper.paper_id}`);
                                                }}
                                            >
                                                View full paper
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                <button className="text-purple-600 flex items-center mt-3 text-sm font-medium hover:text-purple-800 transition-colors">
                    View more related papers <ArrowRight size={16} className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default RelatedPapersDemo;
