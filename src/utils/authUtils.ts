export const setAuthUser = (user: { token: string, role: string, username: string }) => {
    localStorage.setItem("token", user.token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("username", user.username);
};

export const getUserRole = () => localStorage.getItem("role");
export const getToken = () => localStorage.getItem("token");
export const logout = () => localStorage.clear();
