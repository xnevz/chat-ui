import axios from "axios";
import { API_URL } from "./consts";
import { CSRFResponse } from "./ResponseTypes";

/**
 * Gets a new csrf token
 * @returns a new csrf token or null if operation fails
 */
export async function getNewCSRFTokenAsync() {
    try {
        const { data } = await axios.get<CSRFResponse>('csrf/');
        return data.token;
    } catch (error) {
        return null;
    }
}

export function getProfilePicUrlFromId(id: number) {
    return `${API_URL}/friends/${id}/profilePic/`;
}