let count = []; //Arreio vazio
let saveAction;
const max_visor_char = 10;

//Colocando os números no visor
function AddNumber(num) {
    document.getElementById("total").removeAttribute("hidden")
    if(total.innerHTML.length < max_visor_char){
        total.innerHTML += num
    }
}
//Colocando os operadores no visor
function CalcAction(action) {
    let currentNumber = document.getElementById("total").innerHTML

    if(currentNumber.length === 0) { return }

    count.push(Number(document.getElementById("total").innerHTML))
    
    document.getElementById("accumulator").removeAttribute("hidden")
    document.getElementById("accumulator").innerHTML += `${document.getElementById("total").innerHTML} ${action}`
    document.getElementById("total").innerHTML = ""

    count.push(action)   
}
//Colocando ponto flutuante. O atributo includes valida de forma boolean se tem o atributo entre parenteses
function AddComma() {
    let currentNumber = document.getElementById("total").innerHTML

    if (!currentNumber.includes(".")) {
        total.innerHTML += "."
    }
}//Colocando o processo de resultado
function Result() {
    let currentNumber = document.getElementById("total").innerHTML
    let currentAccum = document.getElementById("accumulator").innerHTML

    if(currentAccum[currentAccum.length - 1] === "=" && currentNumber.length > 0) {
        document.getElementById("total").innerHTML = ProcessAction(Number(currentNumber), Number(currentNumber)
        ,saveAction).toString().substring(0, max_visor_char)
    }
    if (count.length === 0) { return }
    count.push(Number(document.getElementById("total").innerHTML))
    document.getElementById("accumulator").innerHTML += `${document.getElementById("total").innerHTML} = `
    ProceesResult()
}//Estudar mais essa parte
function ProceesResult() {
    let action = null
    let current = null
    let total = 0;

    if(isNaN(count[count.length - 1])){
        count.pop() //Retira o ultimo elemento do array
    }
    count.forEach ( n => {
        if(!isNaN(n)) {
            if (current == null) {
                current = n
            } else {
                total += ProcessAction(current, n , action)
                current = null
            }
        } else {
            action = n
            saveAction = n
        }
    })
    if (current != null) {
        total = ProcessAction(total, current, action)
    }
    
    document.getElementById("total").innerHTML = total.toString().substring(0, max_visor_char)
    count = []
}//Cadastrando os operadores
function ProcessAction(num1, num2, action) {
    switch (action){
        case '+': return num1 + num2
        case '-': return num1 - num2
        case 'x': return num1 * num2
        case '/': return num1 / num2
    }
}//Limpando os dados na calculadora
function ClearAll() {
    document.getElementById("total").innerHTML = ""
    document.getElementById("accumulator").innerHTML = ""
    count = []
}//Limoando o visor
function CleanCurrentEntry(){
    document.getElementById("total").innerHTML = ""
} 
function Percentage() {
    let currentNumber = document.getElementById("total").innerHTML
    if(currentNumber != null) {
        document.getElementById("total").innerHTML = Number(document.getElementById("total").innerHTML) / 100
    }

}