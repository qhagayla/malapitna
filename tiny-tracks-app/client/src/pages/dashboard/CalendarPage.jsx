import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import getTime from "@/hooks/getTime.js";
import {
    Modal,
    Typography,
    Button,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function CalendarPage() {
    const [openAddEventModal, setOpenAddEventModal] = useState(false);
    const [openEventDetailsModal, setOpenEventDetailsModal] = useState(false);
    const [openEditEventModal, setOpenEditEventModal] = useState(false);
    const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

    // Function to handle canceling events
    const handleEventCancel = () => {
        setOpenAddEventModal(false);
        setOpenEditEventModal(false);
        setOpenEventDetailsModal(false);
        setOpenConfirmationDialog(false);
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={[]}
                // You can add your events here
            />

            {/* Modal for Add Event */}
            <Modal open={openAddEventModal} onClose={handleEventCancel}>
                <Box>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogContent>
                        {/* Content for adding event */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEventCancel}>Cancel</Button>
                        <Button onClick={handleEventCancel}>Save</Button>
                    </DialogActions>
                </Box>
            </Modal>

            {/* Modal for Event Details */}
            <Modal open={openEventDetailsModal} onClose={handleEventCancel}>
                <Box>
                    <DialogTitle>Event Details</DialogTitle>
                    <DialogContent>
                        {/* Content for event details */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEventCancel}>Close</Button>
                    </DialogActions>
                </Box>
            </Modal>

            {/* Modal for Edit Event */}
            <Modal open={openEditEventModal} onClose={handleEventCancel}>
                <Box>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogContent>
                        {/* Content for editing event */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEventCancel}>Cancel</Button>
                        <Button onClick={handleEventCancel}>Update</Button>
                    </DialogActions>
                </Box>
            </Modal>

            {/* Confirmation Dialog for deleting event */}
            <Dialog
                open={openConfirmationDialog}
                onClose={handleEventCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Delete Event</DialogTitle>
                <DialogContent>{/* Content for confirmation */}</DialogContent>
                <DialogActions>
                    <Button onClick={handleEventCancel}>No</Button>
                    <Button onClick={handleEventCancel}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
