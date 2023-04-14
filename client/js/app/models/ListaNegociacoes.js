class ListaNegociacoes{
    //autoUpdate serve para que o dev não precise lembrar de chamar o update toda vez que a lista mudar
    //é preciso passar o contexto que a função será executada
    constructor(context,autoUpdate){
        this._negociacoes = [];
        this._autoUpdate = autoUpdate;
        this._context = context;
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        //Basicamente troca o this da função por este que eu passei
        Reflect.apply(this._autoUpdate,this._context,[this] );
    }

    get negociacoes(){
        //Programação defensiva, faz com que não consiga alterar a lista através deste metodo
        //pois ele retorna uma copia da lista;
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
        Reflect.apply(this._context,this._autoUpdate,this);
    }
}