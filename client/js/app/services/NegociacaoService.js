//classe especifica para obter as negociações do servidor
class NegociacaoService{

    obterNegociacoesSemana(callback){
        let xhr = new XMLHttpRequest();

        xhr.open('get','negociacoes/semana');

        xhr.onreadystatechange = () =>{
           
            /*
            state 0: requisição ainda não iniciada
            state 1: conexão com o servidor estabelecida
            state 2: requisição recebida
            state 3: processando requisição
            state 4: requisição concluída e resposta pronta 
            */

            if(xhr.readyState == 4){
                
                //porém o estado 4 significa que a requisição e respostas foram concluidas,
                //mas pode retornar erro, que é uma resposta valida, portanto tem que validar o status = 200
                
                if(xhr.status == 200){
                    console.log(JSON.parse(xhr.responseText));
                    callback(null,JSON.parse(xhr.responseText)
                    .map(n => 
                        (new Negociacao(DateHelper.textoParaData(n.data),n.quantidade,n.valor))
                    ));
                }else{
                    console.log(xhr.responseText);
                    callback('Não foi possível obter as negociações');
                }
            }

        }

        xhr.send();

    }

}