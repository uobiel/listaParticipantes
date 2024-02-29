const listaParticipantes = document.querySelector("#listaParticipantes");
const campoBusca = document.querySelector("#campoBusca");
const novoParticipante = document.querySelector("#novoParticipante");
const modalCustom = document.querySelector("#modalCustom");
const inputNome = document.querySelector("#inputNome");
const inputIdade = document.querySelector("#inputIdade");
const inputSalario = document.querySelector("#inputSalario");
const inputArea = document.querySelector("#inputArea");
const cadastrarButton = document.querySelector("#cadastrarButton");
const removerParticipante = document.querySelector(".removeParticipante");

const participantes = [
    {
        nome: "Gabriel Antunes Rodrigues",
        idade: 20,
        salario: 4300,
        areaAtuacao: "QA"
    },
    {
        nome: "Fulano",
        idade: 30,
        salario: 5000,
        areaAtuacao: "TI"
    },
    {
        nome: "Ciclano",
        idade: 25,
        salario: 4000,
        areaAtuacao: "Marketing"
    },
    {
        nome: "Beltrano",
        idade: 35,
        salario: 6000,
        areaAtuacao: "Vendas"
    },
    {
        nome: "Maria Silva",
        idade: 28,
        salario: 4500,
        areaAtuacao: "Recursos Humanos"
    },
    {
        nome: "João Oliveira",
        idade: 40,
        salario: 5500,
        areaAtuacao: "Logística"
    },
    {
        nome: "Amanda Santos",
        idade: 22,
        salario: 3800,
        areaAtuacao: "Administração"
    },
    {
        nome: "Pedro Rocha",
        idade: 33,
        salario: 5200,
        areaAtuacao: "Engenharia"
    },
];

document.addEventListener('DOMContentLoaded', function() {
    carregaParticipantes(participantes);

    novoParticipante.addEventListener('click', function(){
        $('#modalCustom').modal('show');
    });
});

campoBusca.addEventListener('input', function(){
    const buscaFeita = campoBusca.value;
    const resultadoBusca = buscaParticipantes(buscaFeita);

    carregaParticipantes(resultadoBusca);
})

const carregaParticipantes = (arrayParticipante) => {
    listaParticipantes.innerHTML = '';
    arrayParticipante.forEach(participante => {
        listaParticipantes.innerHTML += `
        <a href="#" class="list-group-item list-group-item-action disabled">${participante.nome}</a>
        `
    })
}

const buscaParticipantes = (buscaFeita) => {
    return participantes.filter(participante => {
        return participante.nome.toLowerCase().includes(buscaFeita.toLowerCase());
    })
}

novoParticipante.addEventListener('click', function(){
    limpaCampos();
    const valorNome = inputNome.value;
    const valorIdade = inputIdade.value;
    const valorSalario = inputSalario.value;
    const valorArea = inputArea.value;

    if(valorArea === '') {
        inputArea.style.boxShadow = '0';
    }

    if(valorIdade === '') {
        inputIdade.style.boxShadow = '0';
    }

    if(valorNome === '') {
        inputNome.style.boxShadow = '0';
    }

    if(valorSalario === '') {
        inputSalario.style.boxShadow = '0';
    }
    modalCustom.classList.add('show');
})

cadastrarButton.addEventListener('click', function(){
    validaCamposVazios();
})

const validaCamposVazios = () => {
    const valorNome = inputNome.value;
    const valorIdade = inputIdade.value;
    const valorSalario = inputSalario.value;
    const valorArea = inputArea.value;

    if(valorArea === '') {
        inputArea.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
    } 

    if(valorIdade === '') {
        inputIdade.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
    } 

    if(valorNome === '') {
        inputNome.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
    } 

    if(valorSalario === '') {
        inputSalario.style.boxShadow = '0 0 5px rgba(255, 0, 0, 0.5)';
    } 

    if(valorSalario != '' && valorIdade != '' && valorArea != '' && valorNome != ''){
        adicionaParticipanteNoDB();
        $('#modalCustom').modal('hide');
    }
};

const limpaCampos = () => {
    inputNome.value = '';
    inputIdade.value = '';
    inputArea.value = '';
    inputSalario.value = '';

    inputNome.style.boxShadow = '';
    inputIdade.style.boxShadow = '';
    inputArea.style.boxShadow = '';
    inputSalario.style.boxShadow = '';
};

const adicionaParticipanteNoDB = () => {
    const novoParticipante = {
        nome: inputNome.value,
        idade: inputIdade.value,
        salario: inputSalario.value,
        areaAtuacao: inputArea.value,
    }

    participantes.push(novoParticipante);
    console.log('Participante adicionado com sucesso!');
    console.log(participantes);
    carregaParticipantes(participantes);
}

// Adiciona evento de clique a cada item da lista de participantes
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('list-group-item')) {
        // Pega o índice do item clicado na lista
        const index = Array.from(listaParticipantes.children).indexOf(event.target);
        // Preenche o modal com as informações da pessoa clicada
        preencheModal(participantes[index]);
        // Abre o modal
        $('#modalExemplo').modal('show');
    }
});

// Função para preencher o modal com as informações da pessoa clicada
const preencheModal = (participante) => {
    document.querySelector('.modal-title').textContent = participante.nome;
    document.querySelector('.modal-body').innerHTML = `
        <p><strong>Nome:</strong> ${participante.nome}</p>
        <p><strong>Idade:</strong> ${participante.idade}</p>
        <p><strong>Salário:</strong> ${participante.salario}</p>
        <p><strong>Área de Atuação:</strong> ${participante.areaAtuacao}</p>
    `;
};

document.getElementById('btnRemoverParticipante').addEventListener('click', function() {
    const index = participantes.findIndex(participante => participante.nome === document.querySelector('.modal-title').textContent);
    
    participantes.splice(index, 1);
    
    carregaParticipantes(participantes);
    
    $('#modalExemplo').modal('hide');
});