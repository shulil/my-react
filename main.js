import {createElement, Component, render} from './toy-react.js';
for(let i of [1,2,3] ) {
    console.log(i)
}
class MyComponent extends Component{
    constructor(){
        super();
        this.state = {
            a: 1,
            b: 2
        }
    }
   render() {
       return <div class="b">
           <h1 class="c">my component</h1>
           <button onClick={()=>{this.setState({a:this.state.a+1}) }}>add</button>
           <span>{this.state.a.toString()}</span>
           <span>{this.state.b.toString()}</span>
           {this.children}
           </div>
   }
}
render(<MyComponent>
    <div class="a">234</div>
    <div>
        <h1>bumingbai!!!</h1>
    </div>
</MyComponent>,document.body)