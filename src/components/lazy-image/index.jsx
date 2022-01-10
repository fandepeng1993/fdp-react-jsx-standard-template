import React from 'react';
import './index.less';

const LazyImage = (props) => {
    const {src,width='100px',height='100px'} = props;

    const refImg = React.useRef(null);
    const refImgWrapper = React.useRef(null);
    const loadImageFn = () => {
        console.log('image onload!');
        refImg.current.style.backgroundImage = `url(${refImgWrapper.current.src})`;
        refImg.current.style.display = 'block'; // inline-
    };

    React.useEffect(() => {
        if (src) {
            console.log('pppppppp');
            refImgWrapper.current = new Image();
            refImgWrapper.current.onload = loadImageFn;
            refImgWrapper.current.src = src;
        }
        return () => {
            // clear timeout
        }
    }, [src]);

    return (
        <div className="lazy-image-container" style={{width,height}}>
            <div className="lazy-image" ref={refImg}/>
        </div>
    )
};

export default LazyImage;