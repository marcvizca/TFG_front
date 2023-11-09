import useAuth from './useAuth';
import { refreshToken } from '../controllers/services.controller';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await refreshToken();
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response);
            console.log("PREV", prev);
            const userId = localStorage.getItem ('userId');
            return { ...prev, userId: userId,  accessToken: response }
        });
        return response;
    }
    return refresh;
};

export default useRefreshToken;