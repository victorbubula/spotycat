import classNames from 'classnames';
import IUsuario from '../../interfaces/IUsuario';
import styles from './Perfil.module.scss';
import Pesquisa from './Pesquisa';

interface props{
    usuario: IUsuario
}

export default function Perfil({usuario}:props) {
    return (
        <div className={styles.container}>
            <Pesquisa/>
            <button className={classNames({
                [styles.botao]:true,
                [styles.sino]:true
            })}></button>
            <div className={styles.perfil}>
                <p className={styles.nome}>{usuario.nome}</p>
                {(usuario.foto.length != 0) ? <div><img className={styles.foto} src={usuario.foto[0]} alt="aaaa" /></div> : <h1 className={styles.letra}>{usuario.nome.charAt(0)}</h1>}
            </div>
        </div>
    )
}