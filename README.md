# Advanced-Disk-Schedduling-Simulator
The Advanced Disk Scheduling Simulator is a comprehensive tool designed to demonstrate how various disk scheduling algorithms operate and impact system performance. It simulates the movement of a disk’s read/write head as it processes a queue of I/O requests, providing both visual and numerical insights. Algorithms such as FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK are implemented to show how each method handles seek time, direction, and efficiency differently. This simulator is particularly useful for students, educators, and OS enthusiasts seeking to understand disk management concepts in a more interactive and practical way. By analyzing total head movements and seek sequences, users can clearly compare the effectiveness of each scheduling strategy under different scenarios.
Disk scheduling determines the order in which I/O requests are processed in the queue. Efficient scheduling can significantly reduce the total head movement and improve system responsiveness.
    Interactive and graphical simulation of disk arm movements.
    
 Supports multiple algorithms:

FCFS (First Come First Serve)
SSTF (Shortest Seek Time First)
 SCAN (Elevator Algorithm)
C-SCAN (Circular SCAN)
LOOK and C-LOOK
Input customization for:
Request sequence
Initial head position
Disk size (optional)
Real-time comparison of total and average head movement.
Clear visualization of seek paths and request servicing.

USE CASES:
Educational demonstrations of how disk scheduling works.
Performance comparison between algorithms.
A useful tool for operating system labs or coursework.

This simulator supports multiple popular disk scheduling algorithms, allowing users to input custom request sequences and initial head positions. The simulation then visualizes the arm movement and computes metrics like total head movement and average seek time.



Advanced Disk Scheduling Simulator - Hogwarts Edition

Welcome to the **Advanced Disk Scheduling Simulator**, a magical fusion of Computer Science and Hogwarts! This simulator is designed to help users understand and visualize how different disk scheduling algorithms work, using a **Harry Potter-themed interface** for a more engaging experience.

-Features

-  Built-in support for the following disk scheduling algorithms:
  - FCFS (First Come First Serve)
  - SSTF (Shortest Seek Time First)
  - SCAN (Elevator)
  - LOOK
  - C-SCAN (Circular SCAN)
  - C-LOOK
-  Clean and educational interface tailored for students and educators
-  **Hogwarts Edition Theme** – Stylish UI inspired by the wizarding world
-  C++ Backend for accurate and fast algorithm simulation
-  Interactive Web Interface using **HTML, CSS, and JavaScript**

- Project Structure
advanced-disk-scheduler/
│
├── backend/
│ ├── fcfs.cpp
│ ├── sstf.cpp
│ ├── scan.cpp
│ ├── look.cpp
│ ├── cscan.cpp
│ ├── clook.cpp
│ └── main.cpp # Entry point (menu, I/O handling)
│
├── frontend
│ ├── index.html # Hogwarts-themed UI
│ ├── styles.css # Magical CSS styling
│ └── scripts.js # Algorithm logic + interaction handling
│
├── assets/ # Optional: images, icons, audio for theme


