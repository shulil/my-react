import {createElement, Component, render} from './toy-react.js';
for(let i of [1,2,3] ) {
    console.log(i)
}
class MyComponent extends Component{
   render() {
       return <div>
           <h1>my component</h1>
           {this.children}
           </div>
   }
}
render(<MyComponent>
    <div>234</div>
    <div></div>
</MyComponent>,document.body)