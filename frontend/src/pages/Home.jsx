import ModalCad from "../components/ModalCadastroUser";  // Corrija o caminho conforme necessário
import ModalLog from "../components/ModalLog";  // Corrija o caminho conforme necessário
import ModalBand from "../components/ModalCadastroBand";

const Home = ({ toggleModal,toggleModalBand, toggleModalLog, isModalOpen,isModalBandOpen, isModalLogOpen, closeModal }) => {
    return (
        <div>
            <h1>SomNaCaixa</h1>
            <p>Faça login ou cadastre-se para acessar seu perfil.</p>

            <nav>
                <ul>
                    <li>
                        <button onClick={toggleModal}>Cadastrar-Usuário</button>
                    </li>
                    <li>
                        <button onClick={toggleModalBand}>Cadastrar-Banda</button>
                    </li>
                    <li>
                        <button onClick={toggleModalLog}>Login</button>
                    </li>
                </ul>
            </nav>

            <center>
                <ModalCad isOpen={isModalOpen} onClose={closeModal} />
            </center>

            <center>
                <ModalBand isOpen={isModalBandOpen} onClose={closeModal} />
            </center>


            <ModalLog isOpen={isModalLogOpen} onClose={closeModal} />
        </div>
    );
};

export default Home;
