import styles from "./Sidebar.module.scss";

interface props {
    playlists:string
}

const Sidebar = ({playlists}:props) => {

    return (
        <div className={styles.container}>
            <div className={styles.inicio}>
                <p>Inicio</p>
            </div>
            <div className={styles.biblioteca}>
                <p>Sua Biblioteca</p>
                <p>
                    {playlists}
                </p>
            </div>
        </div>
    )
}

export default Sidebar