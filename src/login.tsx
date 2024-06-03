
import './App.css'

function Login() {

	return (
		<>
			<div className='container'>
				<div className="card">
					<h1 className="logo">spotycat</h1>
					<input type="email" name="conta" id="email" />
					<input type="password" name="senha" id="password" />
					<input className="botao" type="button" value="login" />
				</div>
				
			</div>
		</>
	)
}

export default Login
