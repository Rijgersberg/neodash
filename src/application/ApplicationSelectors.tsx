import { initialState } from "../dashboard/DashboardReducer";
import _ from 'lodash';

export const applicationHasNotification = (state: any) => {
    return state.application.notificationMessage != null;
}

export const getNotification = (state: any) => {
    return state.application.notificationMessage;
}

export const getNotificationTitle = (state: any) => {
    return state.application.notificationTitle;
}

export const applicationIsConnected = (state: any) => {
    return state.application.connected;
}

export const applicationGetConnection = (state: any) => {
    return state.application.connection;
}


export const applicationHasConnectionModalOpen = (state: any) => {
    return state.application.connectionModalOpen;
}

export const applicationHasAboutModalOpen = (state: any) => {
    return state.application.aboutModalOpen;
}


export const applicationHasCachedDashboard = (state: any) => {
    // Avoid this expensive check when the application is connected, as it's only for the welcome screen.
    if (state.application.connected){
        return false;
    }
    return !_.isEqual(state.dashboard, initialState);
}