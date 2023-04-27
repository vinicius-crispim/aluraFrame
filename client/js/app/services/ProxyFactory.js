class ProxyFactory {
    static createProxy(obj, props, acao) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isFunc(target[prop])) {

                    return function () {

                        console.log(`interceptando ${prop}`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver);
            },
 
            set(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.includes(prop)) {
                    acao(target);
                }
                return retorno;
            }
        });
    }
    static _isFunc(fun) {
        return typeof (fun) == typeof (Function);
    }
}