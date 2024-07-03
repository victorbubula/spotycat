import lupa from '../../../assets/lupa.svg'
import { useRef, useState } from 'react';
import styles from './Pesquisa.module.scss'
import classNames from 'classnames';

const Pesquisa = () => {
    const windowWidth = window.innerWidth > 950
    const [barraPesquisa, setBarraPesquisa] = useState(false)
    const validacao = () => windowWidth ? setBarraPesquisa(true) : setBarraPesquisa(false)
    if (window.onload) validacao;
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
        }
        )}>
            <input ref={inputRef} onBlur={validacao} className={styles.buscar} type="search" placeholder='Pesquisar...' />
            <button className={styles.botao} onClick={() => { (barraPesquisa) ? console.log("pesquisar") : foco() }}>
                <img src={lupa} alt="pesquisar" />
            </button>
        </div>
    )
};

export default Pesquisa