// Seleciona o formulário de hábitos pelo seu ID
const form = document.querySelector("#form-habits")

// Cria uma nova instância de NLWSetup passando o formulário como argumento
const nlwSetup = new NLWSetup(form)

// Seleciona o botão localizado no cabeçalho (header)
const button = document.querySelector("header button")

// Adiciona um ouvinte de evento 'click' ao botão, associando a função 'add'
button.addEventListener("click", add)

// Adiciona um ouvinte de evento 'change' ao formulário, associando a função 'save'
form.addEventListener("change", save)

// Define a função que será chamada quando o botão for clicado
function add() {
  // Obtém a data atual formatada para o padrão brasileiro, removendo o ano
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)

  // Verifica se o dia atual já foi adicionado
  const dayExists = nlwSetup.dayExists(today)

  // Se o dia já existe, exibe um alerta e interrompe a execução
  if (dayExists) {
    showNotification("Seu hábito na data de hoje já foi inserido!", "error")
    return
  }

  // Se o dia não existe, exibe um alerta de sucesso e adiciona o dia
  showNotification("Adicionado com sucesso!", "success")
  nlwSetup.addDay(today)
}

// Define a função que salva os dados no localStorage quando há uma mudança no formulário
function save() {
  // Armazena os dados da instância nlwSetup em localStorage, convertendo o objeto para string JSON
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data))
}

// Tenta recuperar os dados de hábitos do localStorage e os parseia de volta para um objeto,
// caso não encontre nada, usa um objeto vazio como padrão
const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {}

// Define os dados de nlwSetup para os dados recuperados ou vazios
nlwSetup.setData(data)

// Carrega os dados na aplicação (possivelmente renderizando-os na interface do usuário)
nlwSetup.load()

function showNotification(message, type = "info") {
  const container = document.getElementById("notification-container")
  const notification = document.createElement("div")

  // Adiciona a classe base e a classe específica do tipo
  notification.className = `notification notification-${type}`

  // Outras propriedades permanecem iguais
  notification.innerText = message
  container.appendChild(notification)
  setTimeout(() => {
    container.removeChild(notification)
  }, 4000)
}

