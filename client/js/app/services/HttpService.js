class HttpService {
    get(url){
        return new Promise((resolve, reject) => {
        
            let xhr = new XMLHttpRequest();

            xhr.open("GET", url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4){

                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    }else{
                        reject('Não foi possível obter as negociações da semana retrasada');
                    }

                }
            }
            xhr.send();
        });
    }

    post(url, dado){
        return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
    
            xhr.open('POST', url, true);
    
            xhr.setRequestHeader("Content-Type", "application/json");
    
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
    
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else {
                        console.log(xhr.responseText)
                        reject(`Não foi possível enviar a negociação`);
                    }
                }
            }
    
            xhr.send(JSON.stringify(dado));
        })

    }
}