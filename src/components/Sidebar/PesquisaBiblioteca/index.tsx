import classNames from "classnames"
import { useRef, useState } from "react";
import styles from './PesquisaBiblioteca.module.scss'

const PesquisaBiblioteca = () => {
    const [barraPesquisa, setBarraPesquisa] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null);
    const foco = async () => {
        await setBarraPesquisa(true)
        if (inputRef.current)
            inputRef.current.focus()
    }
    return (
        <div className={classNames({
            [styles.pesquisa]: true,
            [styles.barra]: (barraPesquisa) ? true : false
        })}>
            <button disabled={barraPesquisa} className={styles.botao} onClick={() => { (barraPesquisa) ? console.log("pesquisar") : foco() }}>
            </button>
            <input ref={inputRef} onBlur={()=> setBarraPesquisa(false)} className={styles.buscar} type="search" placeholder='Pesquisar...' />
            
        </div>
    )
}

export default PesquisaBiblioteca