const tamanhoSenhaElemento = document.querySelector('.parametro-senha__texto');
const botoesTamanho = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkboxes = document.querySelectorAll('.checkbox');
const forcaSenhaElemento = document.querySelector('.forca');
const entropiaElemento = document.querySelector('.entropia');

let tamanhoSenha = 12;
tamanhoSenhaElemento.textContent = tamanhoSenha;

const caracteres = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVXYWZ',
    minusculas: 'abcdefghijklmnopqrstuvxywz',
    numeros: '0123456789',
    simbolos: '!@%*?&()[]{}/\\<>'
};

// Adiciona event listeners para os botões de tamanho
botoesTamanho.forEach(botao => {
    botao.addEventListener('click', () => {
        if (botao.textContent === '-' && tamanhoSenha > 8) {
            tamanhoSenha--;
        } else if (botao.textContent === '+' && tamanhoSenha < 20) {
            tamanhoSenha++;
        }
        tamanhoSenhaElemento.textContent = tamanhoSenha;
        gerarNovaSenha();
    });
});

// Adiciona event listeners para os checkboxes
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', gerarNovaSenha);
});

// Função principal para gerar a senha
function gerarNovaSenha() {
    let caracteresPermitidos = '';
    
    if (checkboxes[0].checked) caracteresPermitidos += caracteres.maiusculas;
    if (checkboxes[1].checked) caracteresPermitidos += caracteres.minusculas;
    if (checkboxes[2].checked) caracteresPermitidos += caracteres.numeros;
    if (checkboxes[3].checked) caracteresPermitidos += caracteres.simbolos;

    if (caracteresPermitidos.length === 0) {
        campoSenha.value = 'Selecione uma opção!';
        forcaSenhaElemento.className = 'forca'; // Limpa a classe
        entropiaElemento.textContent = '';
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senha += caracteresPermitidos[indiceAleatorio];
    }
    
    campoSenha.value = senha;
    calcularForcaSenha(caracteresPermitidos.length);
}

// Função para calcular a força da senha
function calcularForcaSenha(tamanhoAlfabeto) {
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    forcaSenhaElemento.className = 'forca'; // Reseta a classe
    
    if (entropia > 57) {
        forcaSenhaElemento.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenhaElemento.classList.add('media');
    } else {
        forcaSenhaElemento.classList.add('fraca');
    }

    const segundosParaQuebrar = Math.floor(2 ** entropia);
    const diasParaQuebrar = Math.floor(segundosParaQuebrar / (60 * 60 * 24));
    
    entropiaElemento.textContent = `Tempo estimado para um computador quebrar: ${diasParaQuebrar.toLocaleString('pt-BR')} dias.`;
}

// Gera uma senha inicial quando a página carrega
gerarNovaSenha();
