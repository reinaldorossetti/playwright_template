# Exemplos de Algoritmos em JavaScript

## 1. Fatorial de um Número

### O que é?
O fatorial de um número inteiro positivo n (representado por n!) é o produto de todos os inteiros positivos menores ou iguais a n. Por definição, 0! = 1.

### Exemplo:
5! = 5 × 4 × 3 × 2 × 1 = 120

### Implementação Recursiva
```js
function fatorialRecursivo(n) {
  if (n === 0 || n === 1) return 1; // Caso base
  return n * fatorialRecursivo(n - 1); // Chamada recursiva
}

console.log(fatorialRecursivo(5)); // 120
```
**Explicação:**
- Se n for 0 ou 1, retorna 1 (caso base).
- Caso contrário, multiplica n pelo fatorial de n-1, chamando a função novamente.

### Implementação Iterativa
```js
function fatorialIterativo(n) {
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  return resultado;
}

console.log(fatorialIterativo(5)); // 120
```
**Explicação:**
- Inicializa resultado como 1.
- Multiplica resultado por cada número de 2 até n.
- Retorna o resultado final.

---

## 2. Sequência de Fibonacci

### O que é?
A sequência de Fibonacci começa com 0 e 1, e cada termo seguinte é a soma dos dois anteriores.

### Exemplo:
0, 1, 1, 2, 3, 5, 8, 13, ...

### Implementação Recursiva
```js
function fibonacciRecursivo(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacciRecursivo(n - 1) + fibonacciRecursivo(n - 2);
}

console.log(fibonacciRecursivo(6)); // 8
```
**Explicação:**
- Se n for 0, retorna 0. Se n for 1, retorna 1.
- Para n maior, soma o Fibonacci de n-1 com o de n-2.

### Implementação Iterativa
```js
function fibonacciIterativo(n) {
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  return n === 0 ? 0 : b;
}

console.log(fibonacciIterativo(6)); // 8
```
**Explicação:**
- Usa duas variáveis para armazenar os dois últimos valores.
- Atualiza os valores a cada iteração até chegar em n.

---

## 3. Busca Linear

### O que é?
Procura um elemento em um array, verificando cada item até encontrar o valor desejado.

### Exemplo:
Buscar o número 7 no array [2, 4, 7, 10]

### Implementação
```js
function buscaLinear(arr, valor) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === valor) return i; // Retorna o índice encontrado
  }
  return -1; // Não encontrado
}

console.log(buscaLinear([2, 4, 7, 10], 7)); // 2
```
**Explicação:**
- Percorre o array do início ao fim.
- Se encontrar o valor, retorna o índice.
- Se não encontrar, retorna -1.

---

## 4. Bubble Sort (Ordenação Simples)

### O que é?
Algoritmo de ordenação que compara pares de elementos adjacentes e os troca de lugar se estiverem fora de ordem. Repete o processo até o array estar ordenado.

### Implementação
```js
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Troca os elementos
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([5, 2, 9, 1, 5, 6])); // [1, 2, 5, 5, 6, 9]
```
**Explicação:**
- Percorre o array várias vezes.
- Troca elementos adjacentes se estiverem fora de ordem.
- Repete até o array estar ordenado.

---

Se quiser mais exemplos ou explicações sobre outros algoritmos, é só pedir!
