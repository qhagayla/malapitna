import { useNavigate } from "react-router-dom";

const useRouting = () => {
    const navigate = useNavigate();

    const navigateToLogin = (opts) => {
        navigate("/", { state: { ...opts } });
    };

    const navigateToRegistration = (opts) => {
        navigate("/registration", { state: { ...opts } });
    };

    const navigateToDashboard = (opts) => {
        navigate("/dashboard", { state: { ...opts } });
    };

    return { navigateToLogin, navigateToRegistration, navigateToDashboard };
};

export default useRouting;
