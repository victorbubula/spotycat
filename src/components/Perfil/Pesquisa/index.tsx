import lupa from '../../../assets/lupa.svg'
import { useState } from 'react';
import styles from './Pesquisa.module.scss'
import classNames from 'classnames';

const Pesquisa = () => {
    const windowWidth = window.innerWidth > 950
    const [barraPesquisa, setBarraPesquisa] = useState(false)
    const validacao = () => windowWidth ? setBarraPesquisa(true) : setBarraPesquisa(false)
    if (window.onload) validacao;
    return (
        <div className={classNames({
            [styles.pesquisa]: true,
            [styles.barra]: (barraPesquisa) ? true : false
        }
        )}>
            <input onBlur={validacao} className={styles.buscar} type="search" placeholder='Pesquisar...' />
            <button className={styles.botao} onClick={() => { (barraPesquisa) ? console.log("pesquisar") : setBarraPesquisa(true) }}>
                <img src={lupa} alt="pesquisar" />
            </button>
        </div>
    )
};

export default Pesquisa