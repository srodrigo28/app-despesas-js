/***
 * Json vs Objeto literal
 */

let produto = {
    categoria: 'Casa',
    descricao: 'conta de energia',
    preco: '200,00'
}
console.log('-----------------Ex. 1 - Produto Json stringfy-------------------')
console.log(produto);

console.log('\n -----------------Ex. 2 - Produto Json stringfy-------------------')
console.log(JSON.stringify(produto));

console.log('\n \n');
console.log('-----------------Ex. 1 - ProdutoJson JSON.parse ---------------------')

let produtoJson = `{ 
    "categoria": "Casa", 
    "descricao": "conta de energia", 
    "valor": "200,80" 
}`

console.log(produtoJson)
console.log('\n');

console.log('-----------------Ex. 2 - ProdutoJson JSON.parse ---------------------')
console.log(JSON.parse(produtoJson))

//console.log(produtoJson);