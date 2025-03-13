
const Mock = {
    generateUsuarioMock: () => {
        return {
            nome: 'Fulano de Tal',
            username: 'fulando_tal',
            saldo: 7500,
            created_at: '13/03/2025',
        }
    },
    generateUsuarioDataMock: () => {
        return {
            entradas: 10500,
            gastos: 2000,
            investimentos: 1000,
        }
    }
}

export default Mock