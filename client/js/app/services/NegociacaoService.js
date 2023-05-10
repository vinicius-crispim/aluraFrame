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
                    console.log(error + "semana");
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
                    console.log(error+ "anterior");
                    reject("Não foi possível obter as negociações da semana anterior");
                })

        })

    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http.get("negociacoes/retrasada").
            then(negociacoes => resolve(negociacoes.map(n =>
                new Negociacao(new Date(n.data), n.quantidade, n.valor)))).catch(error => {
                console.log(error + "RETRASADA");
                reject("Não foi possível obter as negociações da semana retrasada");
            })
        });
    }

    obterNegociacoes() {
        //Obtem todas as negociações diretamnete
        return Promise.all([this.obterNegociacoesSemana(),
             this.obterNegociacoesSemanaAnterior(),
             this.obterNegociacoesSemanaRetrasada()
            ]).then(periodos => 
            periodos.reduce((dados, periodo) => dados.concat(periodo),[])
        ).catch(erro => {
            throw new Error(erro + "neg");
        });
        
    }

}