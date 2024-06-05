import img from '../assets/gato.jpg'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import './login.css'

const Login = () => {
    return (
		<>
			<Container className='container'>
				<div className="card">
					<h1 className="logo">spotycat</h1>
					<Link to="/autenticacao">Login</Link>
				</div>
				<img src={img} alt="gato" />
			</Container>
		</>
	)
}

export default Login;