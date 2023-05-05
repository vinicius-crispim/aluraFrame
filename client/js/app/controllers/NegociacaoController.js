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

        //Isto faz um data bind, uma associação entre o modelo e a view, toda vez que modelo muda, dispara a view, data bind unidirecional

        this._listanegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')),
            'adiciona', 'esvazia');

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

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

    importarNegociacoes() {

        let service = new NegociacaoService();


        //Padrão de Projeto Promise
        //Promise é o resultado futuro de uma operação

        //Desta forma as promises serão resolvidas em ordem
        
        Promise.all([service.obterNegociacoesSemana(),
            service.obterNegociacoesSemanaAnterior(),
            service.obterNegociacoesSemanaRetrasada()]
        ).then(negociacoes => {
          //Reduce para concatenar todos os arrays em um só
          negociacoes.reduce((arrayAchatado,array) => arrayAchatado.concat(array),[])
          .forEach(negociacao => this._listanegociacoes.adiciona(negociacao));
          this._mensagem.texto = "Negociações Importadas com sucesso";
        }).catch(error => this._mensagem.texto = error);

        /*service.obterNegociacoesSemana().then(negociacoes => {
            //se a promessa for cumprinta, então eu recebo uma lista de negociações
            negociacoes.forEach(negociacao => this._listanegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações da Semana obtidas com sucesso";
        }).catch(error => this._mensagem.texto = error); //se der erro retorna o erro

        service.obterNegociacoesSemanaAnterior().then(negociacoes => {
            negociacoes.forEach(negociacao => this._listanegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações da Semana Anterior obtidas com sucesso";
        }).catch(error => this._mensagem.texto = error);

        service.obterNegociacoesSemanaRetrasada().then(negociacoes => {
            negociacoes.forEach(negociacao => this._listanegociacoes.adiciona(negociacao));
            this._mensagem.texto = "Negociações da Semana Retrasada obtidas com sucesso";
        }).catch(error => this._mensagem.texto = error);*/
    
    }

    _limpaFormulario() {
        this._data.value = "";
        this._quantidade.value = 1;
        this._valor.value = 0.0;
        this._data.focus()
    }

}