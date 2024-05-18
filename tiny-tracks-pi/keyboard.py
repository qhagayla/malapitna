import tkinter as tk

class VirtualKeyboard(tk.Toplevel):
    def __init__(self, entry):
        super().__init__()
        self.title("Virtual Keyboard")
        self.entry = entry
        self.geometry("600x200")
        self.resizable(False, False)
        self.create_keyboard()

    def create_keyboard(self):
        buttons = [
            ("1", "2", "3", "4", "5", "6", "7", "8", "9", "0"),
            ("q", "w", "e", "r", "t", "y", "u", "i", "o", "p"),
            ("a", "s", "d", "f", "g", "h", "j", "k", "l"),
            ("z", "x", "c", "v", "b", "n", "m"),
            ("Space", "Backspace")
        ]

        for row in buttons:
            row_frame = tk.Frame(self)
            row_frame.pack(fill=tk.BOTH, expand=True)
            for key in row:
                if key == "Space":
                    btn = tk.Button(row_frame, text="Space", width=10, command=lambda: self.add_to_entry(" "))
                elif key == "Backspace":
                    btn = tk.Button(row_frame, text="Backspace", width=10, command=self.backspace_entry)
                else:
                    btn = tk.Button(row_frame, text=key, width=5, command=lambda k=key: self.add_to_entry(k))
                btn.pack(side=tk.LEFT, padx=5, pady=5)

    def add_to_entry(self, value):
        self.entry.insert(tk.END, value)

    def backspace_entry(self):
        self.entry.delete(len(self.entry.get()) - 1, tk.END)
