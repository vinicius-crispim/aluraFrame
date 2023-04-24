class MensagemView extends View{
    /* exemplo de constructor
    constructor(element){
        super(elements);
    } 
    Mas quando o constructor for igual ao da super, não precisa por constructor*/

    template(model){
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
    }


}