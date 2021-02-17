import React from 'react';
import './Loading.scss';
import loadingGif from './../../resources/img/loading.gif';

const Loading = () => {
    return (
        <div className="loading">
            <img className="loading__img" src={loadingGif} alt="loading screen" />
        </div>
    );
};

export default Loading;
