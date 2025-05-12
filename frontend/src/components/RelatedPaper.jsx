import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, BarChart2, FileText, PieChart } from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, Tooltip, Legend
} from 'recharts';

const RelatedPapersDemo = ({ papers }) => {
    const [showChart, setShowChart] = useState(true);
    // Only using radar chart, removed unused state
    const [chartType, setChartType] = useState('radar');

    // For debugging axis scaling:
    // console.log("Data upper bound for chart:", calculateOptimalUpperBound());
    const [expandedPaper, setExpandedPaper] = useState(null);
    const [selectedPapers, setSelectedPapers] = useState(papers.map(() => true));

    // Ensure value is a number and not undefined
    const getPercentValue = (value) => {
        const numValue = Number(value);
        return isNaN(numValue) ? 0 : numValue;
    };

    // Calculate the max value and optimal upper bound
    const calculateOptimalUpperBound = () => {
        // Find max value in data to determine scale
        let maxValue = 0;
        papers.forEach(paper => {
            maxValue = Math.max(
                maxValue,
                getPercentValue(paper.relevance_title),
                getPercentValue(paper.relevance_keywords),
                getPercentValue(paper.relevance_summary)
            );
        });

        // Add 20% padding to the max value
        const paddedMax = maxValue * 1.2;

        // Round to nearest "nice" upper bound (5, 10, 15, 20, 25, 30, 40, 50, etc.)
        if (paddedMax <= 5) return 5;
        if (paddedMax <= 10) return 10;
        if (paddedMax <= 15) return 15;
        if (paddedMax <= 20) return 20;
        if (paddedMax <= 25) return 25;
        if (paddedMax <= 30) return 30;
        if (paddedMax <= 40) return 40;
        if (paddedMax <= 50) return 50;
        if (paddedMax <= 75) return 75;
        return 100;
    };

    const chartUpperBound = calculateOptimalUpperBound();

    // Prepare data for radar chart
    const prepareRadarData = () => {
        const filteredPapers = papers.filter((_, idx) => selectedPapers[idx]);

        return [
            {
                category: "Title",
                fullMark: chartUpperBound,
                ...filteredPapers.reduce((acc, paper, index) => {

                    const shortTitle = paper.title.length > 15 ?
                        paper.title.substring(0, 15) + '...' : paper.title;
                    acc[shortTitle] = getPercentValue(paper.relevance_title);
                    return acc;
                }, {})
            },
            {
                category: "Keyword",
                fullMark: chartUpperBound,
                ...filteredPapers.reduce((acc, paper, index) => {
                    const shortTitle = paper.title.length > 15 ?
                        paper.title.substring(0, 15) + '...' : paper.title;
                    acc[shortTitle] = getPercentValue(paper.relevance_keywords);
                    return acc;
                }, {})
            },
            {
                category: "Summary",
                fullMark: chartUpperBound,
                ...filteredPapers.reduce((acc, paper, index) => {
                    const shortTitle = paper.title.length > 15 ?
                        paper.title.substring(0, 15) + '...' : paper.title;
                    acc[shortTitle] = getPercentValue(paper.relevance_summary);
                    return acc;
                }, {})
            }
        ];
    };

    // Generate custom colors with good contrast
    const generateColors = (index) => {
        const colors = [
            '#2563eb', // blue
            '#d97706', // amber
            '#7c3aed', // violet
            '#059669', // emerald
            '#dc2626', // red
            '#6366f1', // indigo
            '#0891b2', // cyan
            '#ea580c', // orange
            '#4f46e5', // blue/indigo
            '#0284c7'  // sky
        ];
        return colors[index % colors.length];
    };

    // Custom tooltip for radar chart
    const CustomRadarTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const category = data.category;

            return (
                <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
                    <p className="font-medium text-sm mb-1">{category}</p>
                    <div className="space-y-1">
                        {payload.map((entry, index) => {
                            if (entry.dataKey !== 'category' && entry.dataKey !== 'fullMark') {
                                // Show paper in tooltip even if value is 0
                                const value = entry.value !== undefined ? entry.value : 0;

                                return (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-xs max-w-[150px] truncate" style={{ color: entry.color }}>
                                            {entry.dataKey}:
                                        </span>
                                        <span className="text-xs font-medium ml-2">
                                            {value.toFixed(1)}%
                                        </span>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="mt-2 pt-1 border-t border-gray-100 text-xs text-gray-500">
                        Scale: 0-{chartUpperBound}%
                    </div>
                </div>
            );
        }
        return null;
    };

    const getRelevanceColor = (value) => {
        if (value < 10) return 'bg-red-100 text-red-800';
        if (value < 50) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    };

    const getRelevanceTextColor = (value) => {
        if (value < 10) return 'text-red-600';
        if (value < 50) return 'text-yellow-600';
        return 'text-green-600';
    };

    const colorMap = {
        title: 'bg-blue-600',
        keywords: 'bg-yellow-500',
        summary: 'bg-green-600'
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-800">Comparison Chart</h2>

                <div className="flex space-x-2">
                    {showChart && (
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setChartType('radar')}
                                className={`flex items-center text-xs px-3 py-1.5 rounded-md transition-all ${chartType === 'radar'
                                    ? 'bg-white text-purple-700 shadow-sm'
                                    : 'text-gray-600 hover:text-purple-600'
                                    }`}
                            >
                                <PieChart size={14} className="mr-1" />
                                <span>Radar</span>
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => setShowChart(!showChart)}
                        className="flex items-center text-sm bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100 hover:bg-purple-100 transition-all text-purple-700"
                    >
                        <BarChart2 size={16} className="mr-1" />
                        <span>{showChart ? 'Hide Comparison' : 'Compare Papers'}</span>
                    </button>
                </div>
            </div>

            {showChart && (
                <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200 shadow-sm transition-all duration-300 ease-in-out">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-gray-700">Relevance Comparison</h3>

                        <div className="flex flex-wrap justify-end gap-2">
                            {papers.map((paper, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        const newSelected = [...selectedPapers];
                                        newSelected[idx] = !newSelected[idx];
                                        setSelectedPapers(newSelected);
                                    }}
                                    className={`text-xs px-2 py-1 rounded-full border transition-all ${selectedPapers[idx]
                                        ? `bg-opacity-20 bg-${generateColors(idx).replace('#', '')} border-${generateColors(idx).replace('#', '')} text-gray-800`
                                        : 'bg-white border-gray-300 text-gray-500'
                                        }`}
                                    style={{
                                        backgroundColor: selectedPapers[idx] ? `${generateColors(idx)}20` : '',
                                        borderColor: selectedPapers[idx] ? generateColors(idx) : ''
                                    }}
                                >
                                    <span className="max-w-[100px] inline-block truncate">
                                        {paper.title.length > 15 ? paper.title.substring(0, 15) + '...' : paper.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart
                                outerRadius={130}
                                width={500}
                                height={350}
                                data={prepareRadarData()}
                                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            >
                                <PolarGrid strokeDasharray="3 3" stroke="#d1d5db" />
                                <PolarAngleAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <PolarRadiusAxis
                                    angle={30}
                                    domain={[0, chartUpperBound]}
                                    axisLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                                    tickFormatter={(value) => `${value}%`}
                                    tickCount={6}
                                />

                                {papers.filter((_, idx) => selectedPapers[idx]).map((paper, index) => {
                                    const paperIndex = papers.findIndex(p => p.paper_id === paper.paper_id);
                                    const shortTitle = paper.title.length > 15 ?
                                        paper.title.substring(0, 15) + '...' : paper.title;

                                    return (
                                        <Radar
                                            key={paper.paper_id}
                                            name={shortTitle}
                                            dataKey={shortTitle}
                                            stroke={generateColors(paperIndex)}
                                            fill={generateColors(paperIndex)}
                                            fillOpacity={0.2}
                                        />
                                    );
                                })}

                                <Legend />
                                <Tooltip content={<CustomRadarTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {papers.map((paper, index) => {
                    const title = getPercentValue(paper.relevance_title);
                    const keywords = getPercentValue(paper.relevance_keywords);
                    const summary = getPercentValue(paper.relevance_summary);
                    const overallRelevance = ((title + keywords + summary) / 3).toFixed(1);
                    const isExpanded = expandedPaper === index;

                    return (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
                        >
                            <div
                                className="p-4 cursor-pointer"
                                onClick={() => setExpandedPaper(isExpanded ? null : index)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center">
                                            <div
                                                className="w-2 h-2 rounded-full mr-2"
                                                style={{ backgroundColor: generateColors(index) }}
                                            ></div>
                                            <h3 className="font-medium text-gray-900">{paper.title}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{paper.authors ?? "N/A"}</p>
                                    </div>
                                    <div className="flex flex-col items-end ml-4">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getRelevanceColor(Number(overallRelevance))}`}>
                                            {overallRelevance}% match
                                        </span>
                                        <div className="mt-2 text-xs text-gray-500 flex items-center">
                                            {isExpanded ?
                                                <>Less detail <ChevronUp size={14} className="ml-1" /></> :
                                                <>More detail <ChevronDown size={14} className="ml-1" /></>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                        <div className="grid grid-cols-3 gap-4">
                                            {[
                                                { label: 'Title', value: title, color: colorMap.title },
                                                { label: 'Keywords', value: keywords, color: colorMap.keywords },
                                                { label: 'Summary', value: summary, color: colorMap.summary }
                                            ].map((item, i) => (
                                                <div key={i} className="flex flex-col">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="text-xs font-medium text-gray-700">{item.label}</span>
                                                        <span className={`text-xs font-medium ${getRelevanceTextColor(item.value)}`}>
                                                            {item.value.toFixed(1)}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className={`${item.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                                                            style={{
                                                                width: `${Math.max(item.value, 0.5)}%`,
                                                                minWidth: '2px'
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>



                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                <button className="text-purple-600 flex items-center mt-4 text-sm font-medium hover:text-purple-800 transition-colors">
                    View more related papers <ArrowRight size={16} className="ml-1" />
                </button>
            </div>
        </div>
    );
};

export default RelatedPapersDemo;