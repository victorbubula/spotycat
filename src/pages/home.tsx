import { useState, useEffect } from 'react';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import IAlbums from '../interfaces/IAlbums';

const clientId: string = 'ea4f5c69626c4ac4a248c6e5f01ebe87';
const clientSecret: string = '16ac7362ab474b98be0eaab33e476a7c';

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [tokenAcesso, setTokenAcesso] = useState("");
  const [albums, setAlbums] = useState<IAlbums[]>([]);

  useEffect(() => {
		// Token de acesso da API
		var authParameters = {
			method:'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
		}
		fetch('https://accounts.spotify.com/api/token', authParameters)
			.then(result => result.json())
			.then(data => setTokenAcesso(data.access_token))
	}, [])

  // Pesquisa
  async function search() {
    console.log('search for ' + searchInput)
    
    // Pesquisando pelo Artist ID 
    var searchParameters ={
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + tokenAcesso
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
        .then(response => response.json())
        .then(data => { return data.artists.items[0].id })

      console.log('artist id is ' + artistID)
    // conseguir todos os albums do artista pelo Artist ID
    var albumsRetornados = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAlbums(data.items);
        })
        console.log(albumsRetornados);
    // Mostrar os albums ao usuario
  }
  
    return (
      <>
        <Container>
          <InputGroup className='mb-3' size='lg'>
            <FormControl
              placeholder='Search For Artist'
              type='input'
              onKeyDown={event => {
                if (event.key == "Enter") {
                  search()
                }
              }}
              onChange={event => setSearchInput(event.target.value)}
            />
            <Button onClick={search}>
              Search
            </Button>
          </InputGroup>
        </Container>
        <Container>
          <Row className='mx-2 row row-cols-4'>
            {albums.map((album: IAlbums|any) => {
              console.log(album);
              return (
                 <Card key={album.id}>
                  <Card.Img src={album.images[0].url}/>
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
              )
            })}
               
              
            
          </Row>
        </Container>
      </>
    );
  };
  
  export default Home;