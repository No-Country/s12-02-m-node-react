import Database from '../config/mongodb.js';
import { createDocument, deleteDocument, getAllDocuments } from '../config/factory.js';
import Likes from '../models/likesModel.js';

class ManagerLikes {
	constructor() {
		this.db = new Database();
		this.createDocument = createDocument;
		// this.getOneDocument = getOneDocument;
		this.getAllDocuments = getAllDocuments;
		this.deleteDocument = deleteDocument;
	}

	// Metodo reutilizable para encontrar al usuario
	// findEmail = async email => {
	//     const getEmail = await getOneDocument('usersCollection', { email });
	//     return getEmail;
	// };

	// Obtener todos los comentarios
	getAllLikes = async query => {
		try {
			const likes = await this.getAllDocuments('likesCollection', query);
			return likes;
		} catch (error) {
			throw new Error(`No se encontro el like: ${error.message}`);
		}
	};

	// Crear un nuevo comentario
	createNewlikes = async data => {
		try {
			const { email, publication_ID } = data;
			const like = Likes({ email, publication_ID });
			await this.createDocument('likesCollection', like);
		} catch (error) {
			throw new Error(`Error al crear el Like: ${error.message}`);
		}
	};

	// Borrar un comentario
	deletelikes = async filter => {
		try {
			const likesDelete = await this.deleteDocument('likesCollection', filter);
			return likesDelete;
		} catch (error) {
			throw new Error(`Error al eliminar el like: ${error.message}`);
		}
	};
}

// Patron singleton para instanciar la clase
export default ManagerLikes;
