import './index.less';
import React from 'react';
import {useSelector} from 'react-redux';

const LazyLoading = () => {
  const {theme} = useSelector(state => state.settings);
  return (
    <>
      {
        <div className="lazyLoading">
          {
            theme === 'night' ? <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="lazy-loading-day-line">
                  <stop stopColor="#fff" stopOpacity="0" offset="0%"/>
                  <stop stopColor="#fff" stopOpacity=".631" offset="63.146%"/>
                  <stop stopColor="#fff" offset="100%"/>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)">
                  <path d="M36 18c0-9.94-8.06-18-18-18" id="lazy-loading-day" stroke="url(#lazy-loading-day-line)"
                        strokeWidth="2">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.9s"
                      repeatCount="indefinite"/>
                  </path>
                  <circle fill="#fff" cx="36" cy="18" r="1">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.9s"
                      repeatCount="indefinite"/>
                  </circle>
                </g>
              </g>
            </svg> : <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="lazy-loading-night-line">
                  <stop stopColor="#000" stopOpacity="0" offset="0%"/>
                  <stop stopColor="#000" stopOpacity=".631" offset="63.146%"/>
                  <stop stopColor="#000" offset="100%"/>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <g transform="translate(1 1)">
                  <path d="M36 18c0-9.94-8.06-18-18-18" id="lazy-loading-night" stroke="url(#lazy-loading-night-line)"
                        strokeWidth="2">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.9s"
                      repeatCount="indefinite"/>
                  </path>
                  <circle fill="#fff" cx="36" cy="18" r="1">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.9s"
                      repeatCount="indefinite"/>
                  </circle>
                </g>
              </g>
            </svg>
          }
        </div>
      }
    </>
  );
};


export default LazyLoading;