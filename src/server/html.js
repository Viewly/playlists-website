import React, { Component } from 'react';

class Html extends Component {
  render () {
    const { children, initialState, title } = this.props;

    return (
      <html>
        <head>
          <title>{title}</title>
        </head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: children }} id='root'/>
          {initialState && <script dangerouslySetInnerHTML={{ __html: `window.APP_STATE=${JSON.stringify(initialState)}` }} />}
        </body>
      </html>
    );
  }
}

export default Html;


// const Html = ({ body, title }) => `
//   <html>
//     <head>
//       <title>${title}</title>
//     </head>
//     <body style="margin:0">
//       <div id="app">${body}</div>
//     </body>
//   </html>
// `;

// export default Html;
