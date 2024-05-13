let funcionarios = [
    {'nome': 'anam maria', 'sexo': 'f', 'idade': 19, 'status': 'ativo'},
    {'nome': 'sofia cris', 'sexo': 'f', 'idade': 21, 'status': 'ativo'},
    {'nome': 'aline tocafundo', 'sexo': 'f', 'idade': 23, 'status': 'inativo'},
    {'nome': 'bruna silvinha', 'sexo': 'f', 'idade': 27, 'status': 'inativo'},
    {'nome': 'bruno oliveira', 'sexo': 'm', 'idade': 27, 'status': 'ativo'},
    {'nome': 'arturno xavier', 'sexo': 'm', 'idade': 27, 'status': 'inativo'}
]

// console.log('lista de funcionários')
// console.log(funcionarios)

funcionarios.filter( function(f) { return f.idade < 20})

funcionarios.filter( f => { return f.idade < 20})

funcionarios.filter( f => { return f.idade < 20})
             .filter( f => { return f.sexo == 'f' })

funcionarios.filter( function(f) { return f.sexo == 'f'})

funcionarios.filter( f => { return f.sexo == 'f'})


// funcionarios.filter( function(f) { return false})