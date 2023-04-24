class NegociacaoController {

    constructor() {
        // colocar como propriedade faz com que a busca no dom seja feita uma vez 
        // e nao a cada adiciona, melhora performance
        let $ = document.querySelector.bind(document);
        this._data = $("#data");
        this._quantidade = $("#quantidade");
        this._valor = $("#valor");
        /*Somente desta maneira ja funciona, usando arrow function
        pois o escopo do this em uma arrow function é léxico, portanto ele 
        não é dinâmico igual o escopo de uma função, ele não muda.
        Portanto o this neste arrow function segue sendo NegociacaoController*/
       //Utilizando proxy para não "sujar" o model 
       
       /*Pede para o ProxyFactory criar um proxy com a instância ListaNegociacoes
       e quando o adiciona ou esvazia forem chamados, executa o negociacoesView update*/
       this._listanegociacoes = ProxyFactory.createProxy(new ListaNegociacoes(),
        ['adiciona', 'esvazia'],
        model=>
            this._negociacoesView.update(model))
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listanegociacoes);

        this._mensagem = ProxyFactory.createProxy(
            new Mensagem(), ['texto'], model =>
                this._mensagemView.update(model));
        this._mensagemView = new MensagemView($('#mensagemView'));  

        this._mensagemView.update(this._mensagem);

    }

    adiciona(event) {
        event.preventDefault();
        this._listanegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
        
    }
    /*adiciona(event) {

    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._limpaFormulario();
} */

    _criaNegociacao() {
        return new Negociacao(DateHelper.textoParaData(this._data.value), this._quantidade.value, this._valor.value)
    }

    apaga() {
        this._listanegociacoes.esvazia();

        this._mensagem.texto = "Negociações apagadas com sucesso!";
     }

    _limpaFormulario() {
        this._data.value = "";
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus()
    }

}