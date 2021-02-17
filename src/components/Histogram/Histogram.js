import React, {useEffect, useState} from 'react';
import './Histogram.scss';
import config from './Histogram.config';

import {Group} from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';

import Loading from './../Loading/Loading';
import Error from './../Error/Error';

import FetchPosts from './../../hooks/fetchPosts';
import {
    formatPostsByMonth,
    reducePostsToStats,
    histogramUtils
} from './Histogram.helpers';

const {
    positioning: {
        width,
        height,
        margin
    },
    colors: {
        green,
        background
    },
    yMax,
    textAnchor
} = config;

const Histogram = () => {
    const [data, setData] = useState([]);
    const {keys, getDate, dateScale, dataScale, tempScale, colorScale, formatDate} = histogramUtils(data);

    const {
        loadAllPosts,
        called,
        loading,
        error: {networkError} = {},
        data: {allPosts} = {}
    } = FetchPosts();

    useEffect(() => {
        loadAllPosts();

        if (called && !loading && !networkError) {
            const formattedPosts = formatPostsByMonth(allPosts);
            const postsStats = reducePostsToStats(formattedPosts);

            setTimeout(() => {
                setData(postsStats);
            }, 3000);
        }

    }, [allPosts]);

    const renderLoadingOrError = () => {
        if (networkError) {
            const {message} = networkError;
            return <Error errorMessage={message} retryCallback={loadAllPosts} />;
        }

        if ((!data.length || loading) && !networkError) return <Loading />;

        return null;
    }

    return (!data.length || networkError)
        ? renderLoadingOrError()
        : (
            <svg width={width} height={height}>
                <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />

                <Group top={margin.top} left={margin.left}>
                    <BarGroup
                        data={data}
                        keys={keys}
                        height={yMax}
                        x0={getDate}
                        x0Scale={dateScale}
                        x1Scale={dataScale}
                        yScale={tempScale}
                        color={colorScale}
                    >
                        {barGroups =>
                            barGroups.map(barGroup => (
                                <Group key={`bar-group-${barGroup.index}-${barGroup.x0}`} left={barGroup.x0}>
                                    {barGroup.bars.map((bar) => (
                                        <rect
                                            key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                                            x={bar.x}
                                            y={bar.y}
                                            width={bar.width}
                                            height={bar.height}
                                            fill={bar.color}
                                            rx={4}
                                        />
                                    ))}
                                </Group>
                            ))
                        }
                    </BarGroup>
                </Group>

                <AxisBottom
                    top={yMax + margin.top}
                    tickFormat={formatDate}
                    scale={dateScale}
                    stroke={green}
                    tickStroke={green}
                    hideAxisLine
                    tickLabelProps={() => ({
                        fill: green,
                        fontSize: 11,
                        textAnchor,
                    })}
                />
            </svg>
        )
};

export default Histogram;
