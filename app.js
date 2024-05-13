class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let item in this){
            if( this[item] == undefined || this[item] == '' || this[item] == null ) {
                return false;
            }
        }
        return true;
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
        /*** aqui não se faz obrigatório
        else{
            this.proximoId = parseInt(id) + 1
            localStorage.setItem('id', this.proximoId)
        }
        */
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        //   localStorage.setItem('despesaApp', JSON.stringify(d))
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistoros(){
        console.log('listando os dados')

        // let despesas = Array();
        let despesas = [];
        let id = localStorage.getItem('id')

        // percorrendo todos os itens usando um laço de repetição.
        for(let i = 1; i <= id; i++){

            let despesa = JSON.parse(localStorage.getItem(i))
            // console.log(i, despesa);

            // verificar indices removidos
            if(despesa === null){
                continue;
            }
            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa){
       let despesasFiltradas = []
       despesasFiltradas = this.recuperarTodosRegistoros()
       // console.log(despesa)
       // console.log(despesasFiltradas)

       // ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.ano == despesa.ano)
        }
       // mes
       if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.mes == despesa.mes)
        }
       // dia
       if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.dia == despesa.dia)
       }
        // tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.tipo == despesa.tipo)
        }
        // descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.descricao == despesa.descricao)
        }
        // valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter( d => d.valor == despesa.valor)
        }

        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa() {

	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa( ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value )
	
	if(despesa.validarDados()) {
		bd.gravar(despesa)
		//dialog de sucesso
        document.getElementById('modal_titulo').innerHTML = 'Sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Registrado com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
		$('#modalRegistraDespesa').modal('show')

        /*** liga os camops */
        function limpar(){
            ano = document.getElementById('ano').value = ''
            mes = document.getElementById('mes').value = ''
            dia = document.getElementById('dia').value = ''
            tipo = document.getElementById('tipo').value = ''
            descricao = document.getElementById('descricao').value = ''
            valor = document.getElementById('valor').value = ''
        }
        limpar()
        window.open('http://127.0.0.1:5500/consulta.html')
	} else {
		//dialog de error
        document.getElementById('modal_titulo').innerHTML = 'Erro não incluido !'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Verifique se todos os campos forão preenchidos'
        document.getElementById('modal_btn').innerHTML = 'Corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
		$('#modalRegistraDespesa').modal('show') 
	}
}

function carregaListaDespesas(despesas = [], filtro = false ){
    
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistoros()
    }

    // selecionar o elemento tbody da tabela
    var listaDespesas = document.getElementById('listaDespesas')
    // limpar a lista toda
    listaDespesas.innerHTML = ''

    despesas.forEach( function(d){
        // console.log(d)

        // criando uma linha (tr)
        let linha = listaDespesas.insertRow()

        // criando uma linha (td)
        // linha.insertCell(0).innerHTML = d.dia + '/' + d.mes + '/' + d.ano
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch (d.tipo) {
            case '1' : d.tipo = 'Alimentação'
            break
            case '2' : d.tipo = 'Educação'
            break
            case '3' : d.tipo = 'Lazer'
            break
            case '4' : d.tipo = 'Saúde'
            break
            case '5' : d.tipo = 'Transporte'
            break
        }
        linha.insertCell(1).innerHTML = `${d.tipo}`
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = 'id_item_'+ d.id
        btn.onclick = function(){
            let id = this.id.replace('id_item_', '')
                bd.remover(id)
                window.location.reload() // recarrega a página apos excluir
        }
        linha.insertCell(4).append(btn)

        console.log(d)
    })
}

function pesquisarDespesa(){
    // console.log('procurando uma despesa')
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesas, true)    
}