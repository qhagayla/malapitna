import tkinter as tk
from tkinter import ttk, messagebox
import cv2
from PIL import Image, ImageSequence, ImageTk
import time
import json
import os
import requests
from keyboard import VirtualKeyboard


class VideoPlayer(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("TinyTracks")
        self.geometry("1600x800")
        self.configure(bg="#F5F5F5")
        self.protocol("WM_DELETE_WINDOW", self.close_event)

        self.load_video_info()
        self.create_styles()
        self.create_sidebar()
        self.create_video_frame()

        self.raw_photo = None
        self.preprocessed_photo = None
        self.raw_photo_images = []
        self.preprocessed_photo_images = []
        self.camera = None
        self.cap = None
        self.record_counter = 1

        self.show_home()

    def load_video_info(self):
        try:
            with open("video_info.json", "r") as file:
                self.video_info = json.load(file)
        except FileNotFoundError:
            self.video_info = {}

    def save_video_info(self):
        with open("video_info.json", "w") as file:
            json.dump(self.video_info, file)

    def create_styles(self):
        self.style = ttk.Style(self)
        self.style.theme_create(
            "custom",
            parent="alt",
            settings={
                "TButton": {
                    "configure": {"foreground": "#333333", "background": "#ffdc4c", "padding": 5},
                    "map": {
                        "foreground": [("pressed", "#333333"), ("active", "#333333")],
                        "background": [("pressed", "#F9DB9B"), ("active", "#F9DB9B")],
                    },
                }
            },
        )
        self.style.theme_use("custom")

        self.style.configure(
            "Sidebar.TButton",
            foreground="#333333",
            background="#ffdc4c",
            font=("Helvetica", 12),
            padding=10,
        )
        self.style.map(
            "Sidebar.TButton",
            background=[("active", "#F9DB9B")],
            foreground=[("active", "#333333")],
        )

    def show_virtual_keyboard(self, event):
        entry_widget = event.widget
        keyboard = VirtualKeyboard(entry_widget)
        keyboard.grab_set()
        keyboard.wait_window()

    def create_sidebar(self):
        sidebar = tk.Frame(self, bg="#ffdc4c")
        sidebar.pack(side=tk.LEFT, fill=tk.Y)

        logo_image = Image.open("assets/logo.png")
        logo_image = logo_image.resize((200, 60))
        logo_photo = ImageTk.PhotoImage(logo_image)
        logo_label = ttk.Label(sidebar, image=logo_photo, background="#ffdc4c")
        logo_label.image = logo_photo
        logo_label.pack(pady=10, padx=10)

        home_button = ttk.Button(
            sidebar, text="Home", command=self.show_home, style="Sidebar.TButton"
        )
        home_button.pack(pady=10)

        camera_button = ttk.Button(
            sidebar,
            text="Live Feed",
            command=self.show_camera,
            style="Sidebar.TButton",
        )
        camera_button.pack()

        client_button = ttk.Button(
        sidebar,
        text="Client",
        command=self.show_client_form,
        style="Sidebar.TButton",
        )
        client_button.pack(pady=10)

    def create_video_frame(self):
        self.video_frame = tk.Frame(self, bg="#F5F5F5")
        self.video_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)

    def show_client_form(self):
        self.clear_video_frame()

        client_form_frame = tk.Frame(self.video_frame, bg="#F5F5F5")
        client_form_frame.pack(pady=10, padx=10)

        ttk.Label(client_form_frame, text="Name:").grid(row=0, column=0, padx=10, pady=5)
        self.client_name_entry = ttk.Entry(client_form_frame)
        self.client_name_entry.grid(row=0, column=1, padx=10, pady=5)
        self.client_name_entry.bind("<Button-1>", self.show_virtual_keyboard)

        ttk.Label(client_form_frame, text="Age:").grid(row=1, column=0, padx=10, pady=5)
        self.client_age_entry = ttk.Entry(client_form_frame)
        self.client_age_entry.grid(row=1, column=1, padx=10, pady=5)
        self.client_age_entry.bind("<Button-1>", self.show_virtual_keyboard)

        ttk.Label(client_form_frame, text="Birthdate (YYYY-MM-DD):").grid(row=2, column=0, padx=10, pady=5)
        self.client_birthdate_entry = ttk.Entry(client_form_frame)
        self.client_birthdate_entry.grid(row=2, column=1, padx=10, pady=5)
        self.client_birthdate_entry.bind("<Button-1>", self.show_virtual_keyboard)

        ttk.Label(client_form_frame, text="Date of Assessment (YYYY-MM-DD):").grid(row=3, column=0, padx=10, pady=5)
        self.client_date_of_assessment_entry = ttk.Entry(client_form_frame)
        self.client_date_of_assessment_entry.grid(row=3, column=1, padx=10, pady=5)
        self.client_date_of_assessment_entry.bind("<Button-1>", self.show_virtual_keyboard)

        ttk.Label(client_form_frame, text="Gender:").grid(row=4, column=0, padx=10, pady=5)
        self.client_gender_var = tk.StringVar()
        self.client_gender_dropdown = ttk.Combobox(client_form_frame, textvariable=self.client_gender_var)
        self.client_gender_dropdown['values'] = ['Male', 'Female']
        self.client_gender_dropdown.grid(row=4, column=1, padx=10, pady=5)

        ttk.Label(client_form_frame, text="Grade Level:").grid(row=5, column=0, padx=10, pady=5)
        self.client_grade_level_entry = ttk.Entry(client_form_frame)
        self.client_grade_level_entry.grid(row=5, column=1, padx=10, pady=5)
        self.client_grade_level_entry.bind("<Button-1>", self.show_virtual_keyboard)

        submit_button = ttk.Button(client_form_frame, text="Submit", command=self.submit_client_form, style="TButton")
        submit_button.grid(row=6, columnspan=2, pady=10)

    def submit_client_form(self):
        name = self.client_name_entry.get()
        age = self.client_age_entry.get()
        birthdate = self.client_birthdate_entry.get()
        date_of_assessment = self.client_date_of_assessment_entry.get()
        gender = self.client_gender_var.get()
        grade_level = self.client_grade_level_entry.get()

        client_data = {
            "name": name,
            "age": age,
            "birthdate": birthdate,
            "date_of_assessment": date_of_assessment,
            "gender": gender,
            "grade_level": grade_level,
        }

        response = requests.post("http://127.0.0.1:8000/v1/clients/", json=client_data)

        if response.status_code == 201:
            messagebox.showinfo("Success", "Client added successfully!")
            self.clear_client_form()
        else:
            messagebox.showerror("Error", "Failed to add client.")

    def clear_client_form(self):
        self.client_name_entry.delete(0, tk.END)
        self.client_age_entry.delete(0, tk.END)
        self.client_birthdate_entry.delete(0, tk.END)
        self.client_date_of_assessment_entry.delete(0, tk.END)
        self.client_gender_var.set('')
        self.client_grade_level_entry.delete(0, tk.END)


    def show_home(self):
        self.clear_video_frame()

        raw_gif_path = "assets/gifs/raw.gif"
        preprocessed_gif_path = "assets/gifs/processed.gif"

        raw_image = Image.open(raw_gif_path)
        preprocessed_image = Image.open(preprocessed_gif_path)

        self.raw_photo = ImageTk.PhotoImage(raw_image)
        self.preprocessed_photo = ImageTk.PhotoImage(preprocessed_image)

        raw_label = ttk.Label(self.video_frame, image=self.raw_photo, background="#F5F5F5")
        raw_label.pack(side=tk.LEFT, padx=20, pady=10)

        processed_label = ttk.Label(self.video_frame, image=self.preprocessed_photo, background="#F5F5F5")
        processed_label.pack(side=tk.LEFT, padx=20, pady=10)

        self.animate_gif(raw_label, raw_image, self.raw_photo_images, speed_factor=1)
        self.animate_gif(processed_label, preprocessed_image, self.preprocessed_photo_images)

    def show_camera(self):
        self.clear_video_frame()

        if not self.check_webcam_availability():
            messagebox.showerror("Error", "No webcam detected. Please connect a webcam and try again.")
            return

        self.cap = cv2.VideoCapture(0)

        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

        record_button = ttk.Button(
            self.video_frame, text="Record", command=self.start_record, style="TButton"
        )
        record_button.pack(pady=20)

        self.display_recorded_videos()

        back_button = ttk.Button(self.video_frame, text="Back", command=self.show_home, style="TButton")
        back_button.pack(pady=20)

    def display_recorded_videos(self):
        recorded_videos_frame = tk.Frame(self.video_frame, bg="#F5F5F5")
        recorded_videos_frame.pack(pady=10)

        for video_file, info in self.video_info.items():
            video_details_frame = tk.Frame(recorded_videos_frame, bg="#F5F5F5", padx=5, pady=5)
            video_details_frame.pack(fill=tk.X)

            video_label = ttk.Label(video_details_frame, text=video_file)
            video_label.pack(side=tk.LEFT, padx=10)

            name_label = ttk.Label(video_details_frame, text=f"Name: {info['name']}")
            name_label.pack(side=tk.LEFT, padx=10)

            age_label = ttk.Label(video_details_frame, text=f"Age: {info['age']}")
            age_label.pack(side=tk.LEFT, padx=10)

            play_button = ttk.Button(
                video_details_frame, text="Play", command=lambda vid=video_file: self.preview_video(vid), style="TButton"
            )
            play_button.pack(side=tk.LEFT, padx=10)

            delete_button = ttk.Button(
                video_details_frame, text="Delete", command=lambda vid=video_file: self.delete_video(vid), style="TButton"
            )
            delete_button.pack(side=tk.LEFT, padx=10)

    def start_record(self):
        if not self.check_webcam_availability():
            messagebox.showerror("Error", "No webcam detected. Please connect a webcam and try again.")
            return

        input_dialog = tk.Toplevel(self)
        input_dialog.title("Input Details")

        self.create_input_dialog_widgets(input_dialog)

        confirm_button = ttk.Button(input_dialog, text="Confirm", command=self.record_video_and_show_camera(input_dialog))
        confirm_button.grid(row=3, columnspan=2, pady=10)

        input_dialog.grab_set()

    def create_input_dialog_widgets(self, input_dialog):
        ttk.Label(input_dialog, text="Filename:").grid(row=0, column=0, padx=10, pady=5)
        self.filename_entry = ttk.Entry(input_dialog)
        self.filename_entry.grid(row=0, column=1, padx=10, pady=5)
        self.filename_entry.bind("<Button-1>", self.show_virtual_keyboard)

        ttk.Label(input_dialog, text="Name:").grid(row=1, column=0, padx=10, pady=5)
        self.name_entry = ttk.Entry(input_dialog)
        self.name_entry.grid(row=1, column=1, padx=10, pady=5)
        self.name_entry.bind("<Button-1>", self.show_virtual_keyboard)

        ttk.Label(input_dialog, text="Age:").grid(row=2, column=0, padx=10, pady=5)
        self.age_entry = ttk.Entry(input_dialog)
        self.age_entry.grid(row=2, column=1, padx=10, pady=5)
        self.age_entry.bind("<Button-1>", self.show_virtual_keyboard)

        ttk.Label(input_dialog, text="Movement Type:").grid(row=3, column=0, padx=10, pady=5)
        self.movement_type_var = tk.StringVar()
        self.movement_type_dropdown = ttk.Combobox(input_dialog, textvariable=self.movement_type_var)
        self.movement_type_dropdown['values'] = ['run', 'gallop', 'hop', 'leap', 'horizontal_jump', 'slide', 'skip']
        self.movement_type_dropdown.grid(row=3, column=1, padx=10, pady=5)

        ttk.Label(input_dialog, text="Select Client:").grid(row=4, column=0, padx=10, pady=5)
        self.client_var = tk.StringVar()
        self.client_dropdown = ttk.Combobox(input_dialog, textvariable=self.client_var)
        self.client_dropdown.grid(row=4, column=1, padx=10, pady=5)

    # Populate the client dropdown with client names
        client_names = self.get_client_names()
        self.client_dropdown['values'] = client_names

    def get_client_names(self):

        url = "http://127.0.0.1:8000/v1/clients/"  # Change this URL to match your Django backend
        response = requests.get(url)
        if response.status_code == 200:
            clients = response.json()
            client_names = [client['name'] for client in clients]
            return client_names
        else:
            return []


    def record_video_and_show_camera(self, input_dialog):
        def record_and_show_camera():
            filename = self.filename_entry.get()
            client = self.client_var.get()
            movement_type = self.movement_type_var.get()
            self.record_video(filename)
            input_dialog.destroy()
            self.show_camera()

        return record_and_show_camera

    def record_video(self, filename):
        self.release_camera()
        self.initialize_camera()

        output_path = filename + ".mp4"
        fourcc = cv2.VideoWriter_fourcc(*'avc1')
        self.out = cv2.VideoWriter(output_path, fourcc, 30.0, (640, 480))

        name = self.name_entry.get()
        age = self.age_entry.get()
        client = self.client_var.get()  # Get the selected client name
        movement_type = self.movement_type_var.get()

        self.video_info[output_path] = {"name": name, "age": age, "client": client, "movement_type": movement_type}

        self.capture_frames()

        self.out.release()
        cv2.destroyAllWindows()
        self.save_video_info()

        self.upload_video_to_backend(output_path, name, client, movement_type)

    def upload_video_to_backend(self, video_path, name, client, movement_type):

        url = "http://127.0.0.1:8000/v1/videos/upload-pro/"  # Change this URL to match your Django backend
        files = {'video': open(video_path, 'rb')}
        data = {'caption': name, 'client_name': client, 'movement_type': movement_type}
        response = requests.post(url, files=files, data=data)
        if response.status_code == 201:
            print("Video uploaded successfully")
        else:
            print("Failed to upload video")

    def release_camera(self):
        if self.cap is not None and self.cap.isOpened():
            self.cap.release()

    def initialize_camera(self):
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    def capture_frames(self):
        start_time = time.time()
        while time.time() - start_time < 5:
            ret, frame = self.cap.read()
            if ret:
                frame = cv2.flip(frame, 1)
                self.out.write(frame)
                cv2.imshow('Recording', frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break

    def preview_video(self, video_file):
        self.release_camera()

        self.cap = cv2.VideoCapture(video_file)
        self.clear_video_frame()

        self.video_label = ttk.Label(self.video_frame, background="#F5F5F5")
        self.video_label.pack(pady=10)

        self.show_frame_from_video()

        back_button = ttk.Button(self.video_frame, text="Back", command=self.show_camera, style="TButton")
        back_button.pack(pady=10)

    def show_frame_from_video(self):
        ret, frame = self.cap.read()

        if ret:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = cv2.resize(frame, (480, 360))
            frame = Image.fromarray(frame)
            frame = ImageTk.PhotoImage(frame)

            self.video_label.configure(image=frame)
            self.video_label.image = frame

            self.video_label.after(10, self.show_frame_from_video)
        else:
            self.cap.release()

    def delete_video(self, video_file):
        if os.path.exists(video_file):
            os.remove(video_file)
            del self.video_info[video_file]
            self.save_video_info()
            self.show_camera()

    def animate_gif(self, label, image, photo_images, speed_factor=1):
        try:
            gif_frames = [ImageTk.PhotoImage(frame) for frame in ImageSequence.Iterator(image)]
            photo_images.extend(gif_frames)

            duration = image.info.get("duration", 100) * speed_factor
            self._animate(label, gif_frames, 0, duration)
        except Exception as e:
            print("Error animating GIF:", e)

    def _animate(self, label, frames, idx, duration):
        if not label.winfo_exists():
            return  # Exit the function if the label has been destroyed

        label.configure(image=frames[idx])
        self.after(duration, self._animate, label, frames, (idx + 1) % len(frames), duration)

    def close_event(self):
        self.release_camera()
        self.save_video_info()
        self.destroy()

    def clear_video_frame(self):
        for widget in self.video_frame.winfo_children():
            widget.destroy()

    def check_webcam_availability(self):
        cap = cv2.VideoCapture(0)
        available = cap.isOpened()
        cap.release()
        return available

if __name__ == "__main__":
    app = VideoPlayer()
    app.mainloop()