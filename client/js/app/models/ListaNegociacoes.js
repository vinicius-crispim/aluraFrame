class ListaNegociacoes{
    //autoUpdate serve para que o dev não precise lembrar de chamar o update toda vez que a lista mudar
    constructor(autoUpdate){
        this._negociacoes = [];
        this._autoUpdate = autoUpdate;
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        this._autoUpdate(this); 
    }

    get negociacoes(){
        //Programação defensiva, faz com que não consiga alterar a lista através deste metodo
        //pois ele retorna uma copia da lista;
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
        this._autoUpdate(this);
    }
}