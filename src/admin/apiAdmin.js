import { API } from 'config';

export const addProduct = (userId, token, product) => {
    return fetch(`${API}/card/add/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ product: product })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createAddress = (userId, token, address) => {

    return fetch(`${API}/Address/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(address)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const CreateEssayQuestion = (userId, token, essayQuestion) => {
    return fetch(`${API}/essayQuestion/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(essayQuestion)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createExam = (userId, token, exam) => {
    return fetch(`${API}/exam/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(exam)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createQuestion = (userId, token, question) => {
    return fetch(`${API}/question/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createPiece = (userId, token, piece) => {
    return fetch(`${API}/piece/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(piece)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createProduct = (userId, token, product) => {
    for (var pair of product.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createPost = (userId, token, post) => {
    return fetch(`${API}/post/create/${userId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createCustomSimulatedByDiscipline = (userId, token, simulated) => {
    return fetch(`${API}/simulated/create-simulated-by-discipline/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createSimulatedByExam = (userId, token, simulated) => {
    return fetch(`${API}/simulated/create-simulated-by-exam/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const createTheme = (userId, token, theme) => {
    return fetch(`${API}/theme/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(theme)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const deleteQuestion = (token, questionId) => {
    return fetch(`${API}/question/${questionId}`, {
        method: 'delete',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteEssayQuestion = (token, EssayQuestionId) => {
    return fetch(`${API}/EssayQuestion/${EssayQuestionId}`, {
        method: 'delete',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deletePiece = (token, pieceId) => {
    return fetch(`${API}/piece/${pieceId}`, {
        method: 'delete',
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const deleteUser = (userId, token) => {
    return fetch(`${API}/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const editPiece = (userId, token, piece) => {
    return fetch(`${API}/piece/${piece._id}/edit`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(piece)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const editEssayQuestion = (userId, token, essayQuestionId, essayQuestion) => {
    console.log(JSON.stringify(essayQuestion));
    return fetch(`${API}/essayQuestion/${essayQuestionId}/edit`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(essayQuestion)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const editQuestion = (userId, token, question) => {
    return fetch(`${API}/question/${question._id}/edit`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const editUser = (userId, token, user) => {
    return fetch(`${API}/user/edit/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const editProfilePhoto = (userId, token, photo) => {
    for (var pair of photo.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    return fetch(`${API}/user/edit/profile/photo/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: photo
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const endSimulated = (userId, token, simulatedId, reportId, simulated) => {
    console.log(reportId);
    return fetch(`${API}/simulated/${simulatedId}/endGame/${userId}/${reportId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getAllEssayQuestions = (token) => {
    return fetch(`${API}/essayquestions`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};
export const getAllPieces = (token) => {
    return fetch(`${API}/pieces`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getAllQuestions = (token) => {
    return fetch(`${API}/questions`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getAllProducts = (token) => {
    return fetch(`${API}/products`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getAllUsers = (token) => {
    return fetch(`${API}/users`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getSimulated = (token, simulatedId) => {
    return fetch(`${API}/simulated/${simulatedId}`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getReport = (token, reportId) => {
    return fetch(`${API}/report/${reportId}`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getCard = (token, currentShoppingCard) => {
    return fetch(`${API}/Card/${currentShoppingCard}`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

};
export const getCep = (cep) => {
    return fetch(`https://viacep.com.br/ws/${cep}/json`, {
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(err => console.log(err));
};
export const getEssayQuestion = (token, essayQuestionID) => {
    return fetch(`${API}/essayQuestion/${essayQuestionID}`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getPiece = (token, pieceID) => {
    return fetch(`${API}/Piece/${pieceID}`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
export const getListProductsCard = (token, currentShoppingCard) => {
    return fetch(`${API}/card/listProductsCard/${currentShoppingCard}`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

};
export const getProduct = (token, idProduct) => {
    return fetch(`${API}/product/${idProduct}/Single`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getQuestion = (token, idQuestion) => {
    return fetch(`${API}/question/${idQuestion}/Single`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getCategories = (token) => {
    return fetch(`${API}/categories`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};
export const getComments = (token) => {
    return fetch(`${API}/comments`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getExams = (token) => {
    return fetch(`${API}/exams`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    }).then(response => {
        return response.json();
    })
        .catch(err => console.log(err));
};
export const getPoints = (userId, token, simulatedId) => {
    return fetch(`${API}/simulated/${simulatedId}/points/${userId}`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getPosts = (token) => {
    return fetch(`${API}/posts`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getTags = (token) => {
    return fetch(`${API}/tags`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getThemes = (token) => {
    return fetch(`${API}/themes`, {
        method: 'GET',
        Authorization: `Bearer ${token}`
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const saveSimulated = (userId, token, simulatedId, simulated) => {
    return fetch(`${API}/simulated/${simulatedId}/save/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(simulated)
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};
