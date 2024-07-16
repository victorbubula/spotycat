import classNames from "classnames"
import { useRef, useState } from "react";
import styles from './PesquisaBiblioteca.module.scss'

interface Props {
    pesquisar:(value: string)=> void
}
const PesquisaBiblioteca = ({pesquisar}: Props) => {
    const [barraPesquisa, setBarraPesquisa] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const Foco = async () => {
        await setBarraPesquisa(true)
        if (inputRef.current)
            inputRef.current.focus()
    }
    const Search = (event:{ target: { value: React.SetStateAction<string>; }; }) => {
        pesquisar(event.target.value.toString())
    }
    return (
        <div className={classNames({
            [styles.pesquisa]: true,
            [styles.barra]: (barraPesquisa) ? true : false
        })}>
            <button disabled={barraPesquisa} className={styles.botao} onClick={() => { if (!barraPesquisa) Foco() }}>
            </button>
            <input ref={inputRef} onChange={Search} onBlur={()=> setBarraPesquisa(false)} className={styles.buscar} type="search" placeholder='Pesquisar...' />
            
        </div>
    )
}

export default PesquisaBiblioteca