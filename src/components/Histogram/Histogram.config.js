const width = 1000;
const height = 500;
const margin = {top: 40, right: 0, bottom: 40, left: 0};

const blue = '#aeeef8';
const green = '#e5fd3d';
const purple = '#9caff6';
const background = '#612efb';

const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

const textAnchor = 'middle';

export default {
    positioning: {
        width,
        height,
        margin
    },
    colors: {
        blue,
        green,
        purple,
        background
    },
    xMax,
    yMax,
    textAnchor
};
