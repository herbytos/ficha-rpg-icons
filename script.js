

// 1. Seleciona TODOS os inputs de uma vez só pela classe '.atributos'
const todosOsInputs = document.querySelectorAll('.atributos');

// 2. Adiciona um "ouvinte de evento" para CADA input encontrado
todosOsInputs.forEach(input => {
    input.addEventListener('input', atualizarQualidade);
});

// 3. Função que atualiza a qualidade com base no valor do input
function atualizarQualidade(event) {

    // 'event.target' é o input exato que o usuário alterou
    const inputAlterado = event.target;
    
    // Pega o valor ATUAL do input e converte para um número
    const valor = parseInt(inputAlterado.value)
    
    let qualidade = ''; // Variável para guardar o texto

    // Lógica para definir a qualidade baseada no valor
    if (valor <= 1) {
        qualidade = "HORRÍVEL";
    } else if (valor == 2) {
        qualidade = "RUIM";
    } else if (valor == 3) {
        qualidade = "COMUM";
    } else if (valor == 4) {
        qualidade = "EFETIVO";
    } else if (valor == 5) {
        qualidade = "BOM";
    } else if (valor == 6) {
        qualidade = "ÓTIMO";
    } else if (valor == 7) {
        qualidade = "INCRÍVEL";
    } else if (valor == 8) {
        qualidade = "ESPETACULAR";
    } else if (valor == 9) {
        qualidade = "FANTASTICO";
    } else if (valor >= 10) {
        qualidade = "SUPREMO";
    }





    

    // Encontra o elemento pai '.linha-atributo' mais próximo do input que foi alterado.
    const linha = inputAlterado.closest('.linha-atributo');
    
    // Dentro APENAS daquela linha, encontra o '.card-quadrado' correspondente.
    const cardQualidade = linha.querySelector('.card-quadrado');

    // Atualiza o texto APENAS daquele quadrado.
    if (cardQualidade) {
        cardQualidade.textContent = qualidade;
    }
}