# ✨ Clean Code em JavaScript

> Guia prático focado em legibilidade, manutenção e escrita de código de alta qualidade.

---

## 📖 1. Introdução
Clean Code é um conjunto de práticas para escrever código legível, fácil de entender, manter e evoluir. Em JavaScript, seguir esses princípios é essencial para evitar bugs e facilitar a colaboração em equipe.

## 🏗️ 2. Princípios Fundamentais
- **Legibilidade acima de tudo**: O código deve ser lido como um texto bem escrito.
- **Simplicidade**: Prefira soluções diretas a complexas (Princípio KISS).
- **Evite duplicação**: Não se repita (Princípio DRY).
- **Mantenha funções pequenas**: Uma função deve ser curta e objetiva.
- **Prefira composição a herança**: Favoreça a flexibilidade.

## 🏷️ 3. Nomes Significativos
- Utilize nomes descritivos para variáveis, funções e classes.
- Evite abreviações e siglas que exijam contexto externo.

> [!TIP]
> Um nome deve dizer **por que** ele existe, o que ele faz e como é usado.

- **❌ Exemplo ruim:**
  ```js
  const d = 10;
  function prc(a, b) { return a + b; }
  ```
- **✅ Exemplo bom:**
  ```js
  const maxUsers = 10;
  function calculateTotal(subtotal, tax) { return subtotal + tax; }
  ```

## 🧩 4. Funções Simples e Pequenas
- **Regra de Ouro**: Uma função deve fazer apenas uma coisa (Single Responsibility).
- Mantenha funções curtas (idealmente até 20 linhas).

- **❌ Exemplo ruim:**
  ```js
  function processUser(user) {
    // valida, salva no banco, envia email de boas-vindas, gera log
  }
  ```
- **✅ Exemplo bom:**
  ```js
  function validateUser(user) { /* ... */ }
  function saveUser(user) { /* ... */ }
  function sendWelcomeEmail(user) { /* ... */ }
  function logUserCreation(user) { /* ... */ }
  ```

## 💬 5. Evite Comentários Desnecessários
- Código limpo deve ser autoexplicativo.
- Use comentários apenas para explicar o **"porquê"** de decisões atípicas, nunca o "o quê".

- **❌ Exemplo ruim:**
  ```js
  // Soma dois números
  function sum(a, b) { return a + b; }
  ```
- **✅ Exemplo bom:**
  ```js
  // Hack necessário para contornar limitação da API legada do fornecedor X
  fetchDataWithTimeout();
  ```

## 📂 6. Estrutura e Organização
- Separe responsabilidades em arquivos e módulos distintos.
- Utilize padrões de projeto (Design Patterns) quando fizer sentido.
- Mantenha uma árvore de diretórios intuitiva e padronizada.

## ⚠️ 7. Tratamento de Erros
- Sempre trate erros com `try/catch` ou manipulação de Promessas (`.catch`).
- Nunca ignore erros silenciosamente; ao menos registre o ocorrido.

- **📜 Exemplo:**
  ```js
  try {
    await saveUser(user);
  } catch (error) {
    console.error('Falha ao persistir usuário:', error.message);
    notifyAdmin(error);
  }
  ```

## ⚡ 8. Boas Práticas Específicas de JavaScript
- Use `const` (preferencialmente) e `let` ao invés de `var`.
- Utilize **Arrow Functions** para funções anônimas e curtas.
- Aplique **Destructuring** para extrair dados de forma limpa.
- **Exemplo:**
  ```js
  const { name, age } = user;
  ```
- Evite aninhamentos profundos (Deep Nesting).

## 🔄 9. Refatoração: Antes vs Depois
**Antes (Código Obscuro):**
```js
function updt(u) {
  if(u.a == null) u.a = 0;
  u.b = u.b + 1;
}
```
**Depois (Código Limpo):**
```js
function updateAccountStatus(account) {
  if (account.age === null) account.age = 0;
  account.loginCount += 1;
}
```

---

## 🛠️ 10. Exemplos Detalhados de Implementação

### 🔍 1. Nomes de Variáveis e Funções
**Ruim:**
```js
function c(u) {
  return u.a * 12;
}
```
**Bom:**
```js
function convertYearsToMonths(user) {
  return user.ageInYears * 12;
}
```
> [!NOTE]
> Nomes claros eliminam a necessidade de comentários explicativos.

### 🧪 2. Funções Puras vs. Efeitos Colaterais
**Ruim:**
```js
let total = 0;
function addToTotal(value) {
  total += value; // Altera estado externo
}
```
**Bom:**
```js
function sum(a, b) {
  return a + b; // Previsível e testável
}
```

### 🚪 3. Early Return (Retorno Antecipado)
**Ruim:**
```js
function isValidUser(user) {
  if (user) {
    if (user.active) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```
**Bom:**
```js
function isValidUser(user) {
  if (!user) return false;
  return !!user.active;
}
```

### 🧠 4. Redução de Complexidade Condicional
**Ruim:**
```js
if (status === 'active' || status === 'pending' || status === 'new') {
  // lógica complexa aqui...
}
```
**Bom:**
```js
const VALID_STATUSES = ['active', 'pending', 'new'];

if (VALID_STATUSES.includes(status)) {
  // lógica limpa aqui...
}
```

### 📊 5. Uso Eficiente de Métodos de Array
**Ruim:**
```js
let activeNames = [];
for (let i = 0; i < items.length; i++) {
  if (items[i].active) {
    activeNames.push(items[i].name);
  }
}
```
**Bom:**
```js
const activeNames = items
  .filter(item => item.active)
  .map(item => item.name);
```

### 🪦 6. Remoção de Código Morto
Remova qualquer código comentado ou funções que não são mais chamadas. Confie no seu sistema de controle de versão (Git) para recuperar o histórico se necessário.

### 📦 7. Modularização por Responsabilidade
**Bom:**
```js
// auth.service.js
export function login() {}
export function logout() {}

// finance.utils.js
export function calculateTax() {}

// notification.provider.js
export function sendEmail() {}
```

## 📝 12. Documentação e Docstrings (JSDoc)
Em JavaScript, utilizamos o **JSDoc** para criar documentações ricas que ajudam o VS Code a fornecer IntelliSense e facilitam o entendimento de funções complexas.

### 💡 Quando documentar?
Documente funções que possuem lógica de negócio complexa ou que serão exportadas para uso em outros módulos. Se a função for extremamente simples e o nome já disser tudo, a docstring pode ser opcional (lembre-se: código limpo primeiro!).

- **✅ Exemplo de Documentação Padrão:**
  ```js
  /**
   * Calcula o valor do desconto progressivo baseado no total da compra.
   * @param {number} totalAmount - O valor total bruto da compra.
   * @param {boolean} isVIP - Define se o cliente possui status VIP.
   * @returns {number} O valor final com o desconto aplicado.
   */
  function calculateDiscount(totalAmount, isVIP) {
    // ...
  }
  ```

### 🚀 Benefícios:
1. **Tipagem implícita**: Melhora o autocompletar do editor.
2. **Auto-explicativo**: Fornece contexto sem que o desenvolvedor precise ler o corpo da função.
3. **Geradores de Docs**: Permite gerar sites de documentação estáticos (como Swagger para APIs ou TypeDoc).

---

## 🔗 13. Referências e Estudos
- 📘 [Clean Code JavaScript (Ryan McDermott)](https://github.com/ryanmcdermott/clean-code-javascript)
- 📗 Livro: *Clean Code*, Robert C. Martin (Uncle Bob)
- 🌐 [MDN JavaScript Guide](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide)

---
*Escrito com ❤️ para desenvolvedores que buscam a excelência.*
