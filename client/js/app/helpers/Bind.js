class Bind {
    //JS o constructor pode ter return, portanto aqui ele recebe modelo, view e as propriedades e retorna um proxy, porem antes atualiza a view
    constructor(model, view, ...props){
        let proxy = ProxyFactory.createProxy(model,props,model=> 
            view.update(model));
        console.log("FOI AQ")
        view.update(model);
            console.log(proxy);
        return proxy;
    }
}