
import { useEffect } from 'react';

function Autenticacao() {

	useEffect(() => {
		const clientId: string = 'ea4f5c69626c4ac4a248c6e5f01ebe87';
		const redirectUri: string = 'https://spotycat.vercel.app/home';

		const scope: string = 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private';
		const authUrl: URL = new URL("https://accounts.spotify.com/authorize?");

		const codeVerifier: string = generateCodeVerifier();
		generateCodeChallenge(codeVerifier).then(codeChallenge => {
			window.localStorage.setItem('code_verifier', codeVerifier);

			const params: Record<string, string> = {
				response_type: 'code',
				client_id: clientId,
				scope,
				code_challenge_method: 'S256',
				code_challenge: codeChallenge,
				redirect_uri: redirectUri,
			};

			authUrl.search = new URLSearchParams(params).toString();
			window.location.href = authUrl.toString();
		});
	}, []);

	const generateCodeVerifier = (): string => {
		const array = new Uint32Array(56 / 2);
		window.crypto.getRandomValues(array);
		return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
	};

	const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		const digest = await window.crypto.subtle.digest('SHA-256', data);
		return btoa(String.fromCharCode(...new Uint8Array(digest)))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
	};
	return (
		<div>
			<h1>Redirecionando para o spotycat</h1>
		</div>
	)

}

export default Autenticacao
