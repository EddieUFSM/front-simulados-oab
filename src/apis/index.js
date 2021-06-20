import { createAddress, listAddresses, readAddress, removeAddress } from './address';
import { readCard, listProductsCard, addProduct} from './card';
import { 
    createCustomSimulatedByDiscipline, 
    createSimulatedByExam, 
    endSimulated, 
    getSimulated, 
    getPoints, 
    saveSimulated } from './simulated';
import { getAllUsers, editUser, deleteUser,update, updateUser, editProfilePhoto } from './user';
import { getEssayQuestion, editEssayQuestion, createEssayQuestion, deleteEssayQuestion, getAllEssayQuestions } from './essayQuestions';
import { getQuestion, createQuestion, editQuestion, deleteQuestion, getAllQuestions } from'./questions';
import { createCategory, getCategories } from './category';
import { createTheme, getThemes} from './theme';
import { createExam, getExams } from './exam';
import { createPiece, deletePiece, editPiece, getAllPieces, getPiece} from './piece';
import { createPost, getPosts } from './posts';
import { createProduct, getAllProducts, getProduct } from './products';
import { getReport } from './reports';
import { getCep } from './externals';

export {
    addProduct,
    createAddress,
    createCategory,
    createCustomSimulatedByDiscipline,
    createEssayQuestion,
    createExam,
    createPiece,
    createPost,
    createProduct,
    createQuestion,
    createSimulatedByExam,
    createTheme,
    deleteEssayQuestion,
    deletePiece,
    deleteQuestion,
    deleteUser,
    editEssayQuestion,
    editPiece,
    editProfilePhoto,
    editQuestion,
    editUser, 
    endSimulated,
    getAllEssayQuestions,
    getAllPieces,
    getAllProducts,
    getAllQuestions,
    listAddresses,
    readAddress,
    readCard,
    getCategories,
    getCep, 
    getExams,
    getEssayQuestion,
    listProductsCard, 
    getPiece,
    getPoints,
    getPosts,
    getProduct,
    getQuestion,
    getReport,
    getSimulated,
    getThemes,
    getAllUsers, 
    removeAddress,
    saveSimulated,
    updateUser,
    update
};
