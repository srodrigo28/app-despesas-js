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
            
            despesas.push(despesa)
        }
        return despesas
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

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value,
		valor.value
	)
	
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
		//dialog de sucesso
        document.getElementById('modal_titulo').innerHTML = 'Erro não incluido !'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Verifique se todos os campos forão preenchidos'
        document.getElementById('modal_btn').innerHTML = 'Corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
		$('#modalRegistraDespesa').modal('show') 
	}
}

function carregaListaDespesas(){
    let despesas = []
    despesas = bd.recuperarTodosRegistoros()

    // console.log(despesas)

    var listaDespesas = document.getElementById('listaDespesas')
    /***
         <tr>
            <td>15/03/2018</td>
            <td>Alimentação</td>
            <td>Compra do mês</td>
            <td>1.080,00</td>
        </tr>
     */

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


    })
}
