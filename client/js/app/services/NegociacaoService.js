//classe especifica para obter as negociações do servidor
class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/semana")
                .then(negociacoes => resolve(negociacoes.map(n =>
                    (new Negociacao(new Date(n.data), n.quantidade, n.valor))
                ))).catch(error => {
                    console.log(error);
                    reject("Não foi possível obter as negociações da semana");
                });
        })
    }

    obterNegociacoesSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http.get("negociacoes/anterior")
                .then(negociacoes => resolve(negociacoes.map(n =>
                    (new Negociacao(new Date(n.data), n.quantidade, n.valor))
                ))).catch(error => {
                    console.log(error);
                    reject("Não foi possível obter as negociações da semana anterior");
                })

        })

    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/retrasada").
            then(negociacoes => resolve(negociacoes.map(n =>
                new Negociacao(new Date(n.data), n.quantidade, n.valor)))).catch(error => {
                console.log(error);
                reject("Não foi possível obter as negociações da semana retrasada");
            })
        });
    }

}