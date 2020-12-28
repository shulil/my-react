
function createElement(type, props, ...children) {
    return {
        type,
        props:{
            ...props,
            children:children.map(child =>{
                return typeof child == 'object'?child:createTextElement(child)
            })
        }
    }
}
/**
 * 文本类型的虚拟dom创建
 */
function createTextElement(text) {
    return {
        type:'TEXT',
        props:{
            nodeValue:text,
            children:[]
        }
    }
}
/**
 * 通过虚拟dom 新建dom元素
 * @param {虚拟dom} vdom 
 */
function createDom(vdom) {
    const dom = vdom.type=='TEXT'
            ?document.createTextNode('')
            :document.createElement(vdom.type);
    Object.keys(vdom.props).filter(key => key!='children').forEach(name =>{
        //@todo 事件处理，属性兼容
        dom[name] = vdom.props[name];
    })
    return dom;
}
/**
 * 
 * @param {虚拟dom} vdom 
 * @param {容器} container 
 */
function render(vdom, container) {
    
    wipRoot = {
        dom:container,
        props: {
            children:[vdom]
        }
    }
    nextUnitOfWork = wipRoot;
    // vdom.props.children.forEach(child=>{
    //     render(child, dom)
    // })
    // container.appendChild(dom);
    //container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`;
}
function commitRoot() {
    commitWorker(wipRoot.child);
    wipRoot = null;
}
function commitWorker(fiber) {
    if(!fiber) {
        return;
    }
    const domParent = fiber.parent.dom;
    domParent.appendChild(fiber.dom);
    commitWorker(fiber.child);
    commitWorker(fiber.siblings);
}
//下一个单元任务
//render会初始化第一个任务
let nextUnitOfWork = null;
let wipRoot = null;
//调度我们的diff或则渲染任务
function workLoop(deadline) {
    //我们有任务，并且当前帧没有结束
    while(nextUnitOfWork && deadline.timeRemaining()>1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    if(!nextUnitOfWork && wipRoot) {
        //没有任务了，并且根节点还在
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
//启动空闲时间处理
requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
    //获取下一个任务
    //根据当前的任务，获取下一个
    if(!fiber.dom) {
        //不是入口
        fiber.dom = createDom(fiber);
    }
    // //真实的dom先注释掉
    // if(fiber.parent) {
    //     fiber.parent.dom.appendChild(fiber.dom)
    // }
    const elements = fiber.props.children;
    //构建fiber结构
    let  index = 0;
    let prevSiblings = null;
    while(index<elements.length) {
        let element = elements[index];
        const newFiber = {
            type:element.type,
            props:element.props,
            parent:fiber,
            dom:null
        }
        if(index==0) {
            //第一个元素，是父元素的child属性
            fiber.child = newFiber;
        } else {
            //其他的是以兄弟元素的形式存在的
            prevSiblings.siblings = newFiber;
        }
        prevSiblings = fiber;
        index++;
        //fiber基本结构构件完成
    }
    //找下一个任务
    //先找子元素
    if(fiber.child) {
        return fiber.child;
    }
    //没有子元素就找兄弟元素
    let nextFiber = fiber;
    while(nextFiber) {
        if(nextFiber.siblings) {
            return nextFiber.siblings;
        }
        //没有兄弟元素找父元素
        nextFiber = nextFiber.parent;
    }
}
// fiber = {
//     dom: 真实dom
//     parent:父亲
//     child: 第一个子元素
//     siblings:兄弟
// }
export default {
    createElement,
    render
}