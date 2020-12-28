import React from './myReact';
//import ReactDOM from 'React-dom';
let ReactDOM = React;
let element = <div>
    <h1 id="test">开始吧！</h1>
    <p>welcome</p>
    <a href="http://www.baidu.com">跳转</a>
</div>
ReactDOM.render(element,document.getElementById('root'));