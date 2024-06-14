import img from '../../assets/gato.jpg'
import { Link } from 'react-router-dom'
import './login.css'

const Login = () => {
	return (
		<>
			<div className='container'>
				<div className="card">
					<h1 className="logo">spotycat</h1>
					<Link to="/autenticacao">Login</Link>
				</div>
				<img src={img} alt="gato" />
			</div>
		</>
	)
}

export default Login;