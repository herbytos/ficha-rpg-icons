



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


    const inputAtual = document.querySelectorAll('.atributos')
    
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



const inputVigor = document.querySelector('input[name="vigor"]');
const inputVontade = document.querySelector('input[name="vontade"]');
const pEnergia = document.querySelector('.valor-energia'); 

// 2. Cria a função que calcula e atualiza a energia
function calcularEnergia() {
    // Pega os valores dos inputs e converte para número. Usa '|| 0' para evitar erros.
    const valorVigor = parseInt(inputVigor.value) || 0;
    const valorVontade = parseInt(inputVontade.value) || 0;

    // Soma os dois valores para obter a energia total
    const energiaTotal = valorVigor + valorVontade;

    // Atualiza o texto do parágrafo de energia com o resultado
    pEnergia.textContent = energiaTotal;
}

// 3. Adiciona "escutadores de eventos" aos inputs corretos
// A função 'calcularEnergia' será chamada sempre que Vigor ou Vontade mudarem
inputVigor.addEventListener('input', calcularEnergia);
inputVontade.addEventListener('input', calcularEnergia);



// Descrição da origem no toast
const meuInput = document.getElementById('meu-input');
const toastNotification = document.getElementById('notificacao');
const toastMessage = document.getElementById('messangem');

// Variável para controlar o timer
let timerId = null;


toastNotification.addEventListener('click', () => {
    clearTimeout(timerId);
    toastNotification.classList.remove('show');
});






// 2. Adiciona um "ouvinte" ao INPUT. O evento 'input' dispara a cada mudança.
meuInput.addEventListener('input', function() {
    // Pega o valor que está atualmente no campo de texto
    const valorAtual = this.value;

    // --- O PULO DO GATO ---
    // Procura por um elemento <option> dentro do datalist
    // que tenha o 'value' EXATAMENTE igual ao valor do input.
    const opcaoCorrespondente = document.querySelector(`#lista-de-origens option[value="${valorAtual}"]`);
    
    

    // Se uma opção correspondente foi encontrada (ou seja, o usuário selecionou ou digitou um valor válido)...
    if (opcaoCorrespondente) {
        // ...chama a função para mostrar a notificação.
        const mensagem = opcaoCorrespondente.dataset.descricao
        showToast(mensagem);
    }
});





// SALVAR E CARREGAR DADOS DA FICHA
const inputsdaficha = document.querySelectorAll('.container-ficha input');


const botaoSalvar = document.getElementById('salvar');
const botaoCarregar = document.getElementById('carregar');


function salvarDados() {
    const dadosParaSalvar = {};
    
    // Tirei a energia do forEach para não repetir a mesma ação várias vezes à toa!
    const energia = energiavalor.textContent;
    dadosParaSalvar['energia'] = energia;

    // Salvamos a imagem convertida que está na tag <img>
    dadosParaSalvar['fotoPersonagem'] = document.getElementById('profile-image').src;

    inputsdaficha.forEach(input => {
        // IGNORA o input de imagem para não dar erro!
        if (input.type === 'file') return; 

        const chave = input.id;
        const valor = input.value;
        dadosParaSalvar[chave] = valor;
    });

    console.log(dadosParaSalvar);

    const dadosJSON = JSON.stringify(dadosParaSalvar);
    localStorage.setItem('dadosFichaRPG', dadosJSON);

    alert('Ficha salva com sucesso!');
}



function carregarDados() {
    const fichasalva = localStorage.getItem('dadosFichaRPG');
    if (fichasalva) {
        const dadosCarregados = JSON.parse(fichasalva);

        // 1. Carrega a imagem do personagem de volta
        if (dadosCarregados['fotoPersonagem']) {
            document.getElementById('profile-image').src = dadosCarregados['fotoPersonagem'];
        }

        // 2. Carrega a energia (caso precise atualizar na tela)
        if (dadosCarregados['energia']) {
            energiavalor.textContent = dadosCarregados['energia'];
        }

        // 3. Carrega os inputs normais
        for (const chave in dadosCarregados) {
            // Pulamos as chaves customizadas para focar só nos inputs
            if (chave === 'fotoPersonagem' || chave === 'energia') continue;

            const input = document.getElementById(chave);
            if (input) {
                input.value = dadosCarregados[chave];
            }
        }
    }
}


const profileImage = document.getElementById('profile-image');
const fotoInput = document.getElementById('foto-input');

profileImage.addEventListener('click', () => {
    fotoInput.click();
});

fotoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        // Usamos o FileReader para ler a imagem e transformá-la em texto (Base64)
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // e.target.result contém a imagem gigante em formato de texto
            profileImage.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
});

botaoSalvar.addEventListener('click', salvarDados);
botaoCarregar.addEventListener('click', carregarDados);