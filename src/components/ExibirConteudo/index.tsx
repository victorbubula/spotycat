import IPage from "../../interfaces/IPage"

interface props {
    exibindo: IPage
}

const ExibirConteudo = ({exibindo}: props) => {
    
    
    
    return(
        <h1>{exibindo.name}</h1>
    )
}

export default ExibirConteudo