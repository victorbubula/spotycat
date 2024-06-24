import img from '../../assets/gato.jpg';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.card}>
					<h1 className={styles.logo}>Spotycat</h1>
					<Link to="/autenticacao" className={styles.botao}>Fazer login no spotify</Link>
				</div>
				<img src={img} alt="gato" className={styles.gato} />
				<div className={styles.canto}></div>
			</div>
		</>
	)
}

export default Login;