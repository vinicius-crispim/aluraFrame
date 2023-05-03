class ListaNegociacoes{
    //autoUpdate serve para que o dev não precise lembrar de chamar o update toda vez que a lista mudar
    constructor(){
        this._negociacoes = [];
    }

    adiciona(negociacao){
        
        this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        //Programação defensiva, faz com que não consiga alterar a lista através deste metodo
        //pois ele retorna uma copia da lista;
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
    }

    get volumeTotal(){
        return this._negociacoes.reduce((total,n) => total + n.volume, 0.0);
    } 
}