import {scaleBand, scaleLinear, scaleOrdinal} from '@visx/scale';
import config from './Histogram.config';

const {
    colors: {
        blue,
        green,
        purple
    },
    xMax,
    yMax
} = config;

const formatPostsByMonth = (postsData) => {
    return postsData.reduce((acc, curr) => {
        const getMonth = new Date(Number(curr.createdAt)).toLocaleString('en-us', {month: '2-digit', year: 'numeric'});
        acc[getMonth] = [...(acc[getMonth] || []), curr];

        return acc;
    }, {});
};

const reducePostsToStats = (postsData) => {
    const postsStatsByMonth = Object.entries(postsData).sort((a, b) => a[0].localeCompare(b[0]));

    return postsStatsByMonth.map((postsOfMonth) => {
        const postsTopicsStatusByMonth = postsOfMonth[1].reduce((acc, curr) => curr.likelyTopics.reduce((acc, curr) => acc + curr.likelihood, 0), 0);

        return {
            date: postsOfMonth[0],
            post: postsOfMonth[1].length,
            topics: postsTopicsStatusByMonth
        }
    });
}

const histogramUtils = (data) => {
    const formatDate = (date) => date

    const keys = data.length && Object.keys(data[0]).filter(d => d !== 'date');

    const getDate = (d) => d.date;

    const dateScale = scaleBand({
        domain: data.map(getDate),
        padding: 0.2,
    });

    const dataScale = scaleBand({
        domain: keys,
        padding: 0.1,
    });

    const tempScale = scaleLinear({
        domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => Number(d[key])))))],
    });

    const colorScale = scaleOrdinal({
        domain: keys,
        range: [blue, green, purple],
    });

    dateScale.rangeRound([0, xMax]);
    dataScale.rangeRound([0, dateScale.bandwidth()]);
    tempScale.range([yMax, 0]);

    return {
        formatDate,
        keys,
        getDate,
        dateScale,
        dataScale,
        tempScale,
        colorScale
    }
}

export {
    formatPostsByMonth,
    reducePostsToStats,
    histogramUtils
}
