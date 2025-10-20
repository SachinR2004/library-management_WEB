import { clearUserSession } from '../utils/api';
import { redirectToHome } from '../app';

const logout = () => {
    clearUserSession();
    redirectToHome();
};

export default logout;