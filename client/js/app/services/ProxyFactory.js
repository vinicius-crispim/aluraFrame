class ProxyFactory {
    static createProxy(obj, props, acao) {
       return new Proxy(obj, {
            get(target, prop, receiver) {

                if (props.includes(prop) && ProxyFactory._isFunc(target[prop])) {
                    return function () {
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);

                    }
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
            
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }
    static _isFunc(fun){
        return typeof (fun) == typeof (Function);
    }
}