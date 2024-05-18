import React from "react";
import {
    HiViewGrid,
    HiUserGroup,
    HiCalendar,
    HiDocumentReport,
    HiChartBar,
    HiChatAlt,
    HiAdjustments,
    HiQuestionMarkCircle,
    HiFilm, 
} from "react-icons/hi";

const ICON_SIZE = 24;

export const NAVIGATION_MENU = [
{/*
    {
        key: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: <HiViewGrid size={ICON_SIZE} />,
    },
*/},
    {
        key: "clients",
        label: "Clients",
        path: "/",
        icon: <HiUserGroup size={ICON_SIZE} />,
    },
    {
        key: "video-dashboard",
        label: "Recorded Videos",
        path: "/video-dashboard",
        icon: <HiFilm size={ICON_SIZE} />,
    },
{/*
    {
        key: "calendar",
        label: "Calendar",
        path: "/calendar",
        icon: <HiCalendar size={ICON_SIZE} />,
    },
    {
        key: "reports",
        label: "Reports",
        path: "/reports",
        icon: <HiDocumentReport size={ICON_SIZE} />,
    },
    {
        key: "progress-tracking",
        label: "Progress Tracking",
        path: "/progress-tracking",
        icon: <HiChartBar size={ICON_SIZE} />,
    },
    {
        key: "messages",
        label: "Messages",
        path: "/messages",
        icon: <HiChatAlt size={ICON_SIZE} />,
    },
*/}
];
{/*
export const NAVIGATION_CONFIG = [
    {
        key: "settings",
        label: "Settings",
        path: "/settings",
        icon: <HiAdjustments size={ICON_SIZE} />,
    },
    {
        key: "help-center",
        label: "FAQs",
        path: "/help-center",
        icon: <HiQuestionMarkCircle size={ICON_SIZE} />,
    },
];
*/}
