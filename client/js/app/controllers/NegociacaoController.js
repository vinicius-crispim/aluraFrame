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
        let self = this;
        //this._listanegociacoes = new ListaNegociacoes(model => self._negociacoesView.update);
       //Utilizando proxy para não "sujar" o model 
        this._listanegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {

                if (['adiciona', 'esvazia'].includes(prop) && typeof (target[prop]) == typeof (Function)) {
                    return function () {

                        console.log(target);
                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        self._negociacoesView.update(target);

                    }
                }
                return Reflect.get(target, prop, receiver);
            }
        });
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listanegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));

        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();

        this._listanegociacoes.adiciona(this._criaNegociacao());
        console.log(this._listanegociacoes.negociacoes);

        this._mensagem._text = "Negociação adicionada com sucesso!";
        this._mensagemView.update(this._mensagem);

        this._negociacoesView.update(this._listanegociacoes);

        this._limpaFormulario();
    }

    _criaNegociacao() {
        return new Negociacao(DateHelper.textoParaData(this._data.value), this._quantidade.value, this._valor.value)
    }

    apagaNegociacoes() {
        this._listanegociacoes.esvazia();
        this._negociacoesView.update(this._listanegociacoes);

        this._mensagem._text = "Negociações apagadas com sucesso!";
        this._mensagemView.update(this._mensagem);
    }

    _limpaFormulario() {
        this._data.value = "";
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus()
    }

}