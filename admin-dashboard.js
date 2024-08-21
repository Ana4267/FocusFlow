const employeeData = {
    'Alexandre Henrique Monteiro da Silva': {
        heartRate: [70, 72, 68, 74, 71, 73, 69],
        bloodPressure: [120, 122, 118, 124, 119, 121, 123],
        bodyTemperature: [36.5, 36.6, 36.7, 36.8, 36.6, 36.7, 36.8],
        breakFrequency: [2, 3, 2, 4, 3, 2, 3]
    },
    'Isabella Catarina Almeida de Oliveira': {
        heartRate: [75, 78, 74, 76, 77, 79, 74],
        bloodPressure: [125, 127, 123, 128, 126, 130, 124],
        bodyTemperature: [36.6, 36.7, 36.8, 36.9, 37.0, 36.8, 36.7],
        breakFrequency: [3, 4, 3, 5, 4, 3, 4]
    },
    'Clarissa Maria dos Santos Carvalho': {
        heartRate: [70, 72, 68, 74, 71, 73, 69],
        bloodPressure: [120, 122, 118, 124, 119, 121, 123],
        bodyTemperature: [36.5, 36.6, 36.7, 36.8, 36.6, 36.7, 36.8],
        breakFrequency: [2, 3, 2, 4, 3, 2, 3]
    },
    'Eduardo Augusto Almeida Pereira': {
        heartRate: [75, 78, 74, 76, 77, 79, 74],
        bloodPressure: [125, 127, 123, 128, 126, 130, 124],
        bodyTemperature: [36.6, 36.7, 36.8, 36.9, 37.0, 36.8, 36.7],
        breakFrequency: [3, 4, 3, 5, 4, 3, 4]
    }
};

function calculateAverages(data) {
    const averages = {
        heartRate: [],
        bloodPressure: [],
        bodyTemperature: [],
        breakFrequency: []
    };

    const numEmployees = Object.keys(data).length;

    for (const metric in averages) {
        for (let i = 0; i < data[Object.keys(data)[0]][metric].length; i++) {
            let sum = 0;
            for (const employee in data) {
                sum += data[employee][metric][i];
            }
            averages[metric].push(sum / numEmployees);
        }
    }
    return averages;
}

function populateEmployeeList() {
    const employeeList = document.getElementById('employeeList');
    for (const employee in employeeData) {
        const li = document.createElement('li');
        li.textContent = employee;
        li.onclick = () => {
            localStorage.setItem('selectedEmployee', employee);
            window.location.href = 'index.html';
        };
        employeeList.appendChild(li);
    }
}

function initializeCharts() {
    const averages = calculateAverages(employeeData);

    const ctxHeartRate = document.getElementById('heartRateChart').getContext('2d');
    const ctxBloodPressure = document.getElementById('bloodPressureChart').getContext('2d');
    const ctxBodyTemperature = document.getElementById('bodyTemperatureChart').getContext('2d');
    const ctxBreakFrequency = document.getElementById('breakFrequencyChart').getContext('2d');

    new Chart(ctxHeartRate, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Batimento Cardíaco',
                data: averages.heartRate,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });

    new Chart(ctxBloodPressure, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Pressão Arterial',
                data: averages.bloodPressure,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });

    new Chart(ctxBodyTemperature, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Temperatura Corporal',
                data: averages.bodyTemperature,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });

    new Chart(ctxBreakFrequency, {
        type: 'line',
        data: {
            labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Média de Frequência de Pausas',
                data: averages.breakFrequency,
                borderColor: '#58af9b',
                backgroundColor: 'rgba(29, 38, 91, 0.2)',
                fill: false
            }]
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    populateEmployeeList();
});
