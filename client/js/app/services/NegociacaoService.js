//classe especifica para obter as negociações do servidor
class NegociacaoService{

    obterNegociacoesSemana(){
        //transformando em promise
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
    
            xhr.open('get','negociacoes/semana');
    
            xhr.onreadystatechange = () =>{
    
                if(xhr.readyState == 4){        
                    if(xhr.status == 200){
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText)
                        .map(n => 
                            (new Negociacao(new Date(n.data),n.quantidade,n.valor))
                        ));
                    }else{
                        console.log(xhr.responseText);
                        reject('Não foi possível obter as negociações');
                    }
                }
    
            }
    
            xhr.send();


        })

    }

    obterNegociacoesSemanaAnterior(callback){
        let xhr = new XMLHttpRequest();

        xhr.open('get','negociacoes/anterior');

        xhr.onreadystatechange = () =>{
            if(xhr.readyState == 4){
                
                if(xhr.status == 200){
                    console.log(JSON.parse(xhr.responseText));
                    callback(null,JSON.parse(xhr.responseText)
                    .map(n => 
                        (new Negociacao(new Date(n.data),n.quantidade,n.valor))
                    ));
                }else{
                    console.log(xhr.responseText);
                    callback('Não foi possível obter as negociações da semana anterior');
                }
            }

        }

        xhr.send();


    }

    obterNegociacoesSemanaRetrasada(callback){
        let xhr = new XMLHttpRequest();

        xhr.open('get','negociacoes/retrasada');

        xhr.onreadystatechange = () =>{

            if(xhr.readyState == 4){           
                if(xhr.status == 200){
                    console.log(JSON.parse(xhr.responseText));
                    callback(null,JSON.parse(xhr.responseText)
                    .map(n => 
                        (new Negociacao(new Date(n.data),n.quantidade,n.valor))
                    ));
                }else{
                    console.log(xhr.responseText);
                    callback('Não foi possível obter as negociações da semana retrasada');
                }
            }

        }

        xhr.send();

    }

}