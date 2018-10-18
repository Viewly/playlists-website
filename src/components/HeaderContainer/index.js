import React, { Component } from "react";
import { Link } from "react-router-dom";

class HeaderContainer extends Component {
  render() {
    return (
      <header className='c-header'>
        <div className='o-wrapper c-header__wrapper'>
          <div className='c-header-wrapper__left'>
            <Link to='/' className='c-logo'>
              <svg className='c-logo__img' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583.15 149.38">
                <g data-name="Layer 2">
                  <g data-name="Layer 1">
                    <path d="M6.1 87.88c4.91 26 18.22 47.17 44.39 57 20.29 7.71 42.68 4.82 62.52-3.72 16.69-7.25 31.89-19.62 38.64-36.27a61.84 61.84 0 0 0 3.14-32.82 90.51 90.51 0 0 0-8.7-26.64C141 35.37 133.42 29 123.7 23.41a94.55 94.55 0 0 0-28.18-10.54C81.2 9.92 65.28 9 50.71 11.93A64.93 64.93 0 0 0 40 15.07C10.66 26.6.36 57.46 6.1 87.88z" fill="#ffce00"/>
                    <path d="M146.59 52.75A96.64 96.64 0 0 0 134 26.95c-6.5-9.52-15-14.95-25.15-19.16a90.48 90.48 0 0 0-28.91-6.62c-14.32-1-30 .36-43.53 5.42C1.2 19.81-6.54 56.69 4.95 90.16c8.81 25.73 25 45.25 51.91 51.53 21 4.87 42.15-1.22 60-12.79 15-9.74 27.84-24.49 31.87-42.36a66.32 66.32 0 0 0-2.08-33.76" opacity=".9" fill="#68ddd7"/>
                    <path d="M126.5 28.45a59.07 59.07 0 0 0-26-17.07 87.4 87.4 0 0 0-26.13-4.65C63.7 6.44 54.93 9.86 46 15.29a88.37 88.37 0 0 0-21.45 18.37c-8.78 10.43-16.71 23-20.63 36.17-10.35 34.17 8.41 55.76 25.58 65.65 22 12.7 65.45 10.45 85.35-6.61C130.43 115.59 138 96.09 139.61 76c1.4-16.84-2.15-34.75-13.05-47.64" fill="#f946a0" opacity=".9"/>
                    <path d="M138.31 108.27c3.92-9.47 5.15-19.83 6.08-29.94 1.42-14.6 2.59-29.78-1.29-44.07-4-14.76-18.09-21.9-31.38-27.79C74.51-10 46.33 9.17 37.6 17.76 21 34.14-3.53 60.11 3.33 85.6c4 14.66 14.81 26.91 26.89 35.51 12.79 9.11 32.27 15.72 51.46 16.58 23.78 1.06 47.1-6.69 56.65-29.44" fill="#5f6cff" opacity=".8"/>
                    <path d="M141.74 56.08c-2.71-9.5-7.1-19-14.9-24.89C100.5 11.28 63.1 16.05 55.25 19.75A95.48 95.48 0 0 0 24 42.12C2.16 66.94 10.78 98.33 32.81 119c16.95 16 37.08 24.11 60.19 17.61 18-5 31.88-18.57 41.06-34.9 7.69-13.73 11.71-30.38 7.67-45.57" fill="#1b1b56" opacity=".9"/>
                    <path d="M99.68 83.35L72 99.4a9.23 9.23 0 0 1-13.85-8V59.32a9.23 9.23 0 0 1 13.85-8l27.72 16a9.23 9.23 0 0 1-.04 16.03z" fill="#fff"/>
                    <path d="M228.73 104.8h-15.17l-22.91-56.08h16.64l13.91 37.61 13.34-37.62h16zM267.26 20.9a9.35 9.35 0 1 1-9.35 9.46 9.34 9.34 0 0 1 9.35-9.46zm-7.52 83.9V48.72h15.16v56.08zM344.55 94.66c0 3.76.23 7.87.46 10.15h-14.48a38.77 38.77 0 0 1-.57-6.5c-2.51 4.45-8.21 7.87-15.73 7.87-16 0-27.36-12.54-27.36-29.53 0-16.42 11.06-29.3 26.9-29.3 9.69 0 14.25 4 15.85 7v-32h14.93zM316 92.6c7.75 0 13.79-5.93 13.79-16.07s-6-15.62-13.79-15.62-13.91 5.7-13.91 15.73S308.07 92.6 316 92.6zM379.09 42.56v6.16h22.34V22.27h15.17v82.53h-15.17V61.71h-22.34v43.09h-15.27V61.71h-9.35v-13h9.35v-6.38c0-12.65 8-20.86 20.41-20.86a22 22 0 0 1 7.52 1.14v12.77a17 17 0 0 0-4.79-.57c-3.31 0-7.87 1.48-7.87 7.75zM487.39 76.76c0 17.21-12.65 29.75-29.41 29.75S428.57 94 428.57 76.76 441.22 47 458 47s29.39 12.43 29.39 29.76zm-15.16 0c0-10.6-6.84-16-14.25-16s-14.25 5.36-14.25 16 6.84 16 14.25 16 14.25-5.4 14.25-16zM545.64 48.72l12.08 36.14 10.38-36.14h15l-17.51 56.08h-15.16l-13.11-38.3-12.88 38.3h-15.39l-17.9-56.09h16l10.37 36 12.2-36z"/>
                  </g>
                </g>
              </svg>
            </Link>
          </div>

          <div className='c-header-wrapper__right'>
            <a href='#' className='c-btn c-btn--primary c-btn--plain'>Create your playlist</a>
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderContainer;
