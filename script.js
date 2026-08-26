/* ==========================================================================
   ROHITH — BIOMEDICAL & ROBOTICS ENGINEERING PORTFOLIO
   JavaScript Interactive Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initOscilloscopeCanvas();
  initTelemetryConsole();
  initCaseStudyModal();
  initProofModal();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   NAVBAR & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileNav) {
    const closeMobileNav = () => {
      mobileNav.classList.remove('open');
      mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileNav();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   REAL-TIME SIGNAL OSCILLOSCOPE CANVAS (EMG / PWM WAVEFORM)
   -------------------------------------------------------------------------- */
function initOscilloscopeCanvas() {
  const canvas = document.getElementById('emgCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  let phase = 0;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function draw() {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw Grid Lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 15) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Waveform (Simulated Active EMG Signal Pulse)
    ctx.beginPath();
    ctx.strokeStyle = '#FF3B30';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#FF3B30';

    for (let x = 0; x < width; x++) {
      // Sine wave modulated with noisy EMG bursts
      const noise = (Math.sin(x * 0.15 + phase) * 0.4 + Math.sin(x * 0.05 - phase * 0.8) * 0.6);
      const isBurst = (x % 140 > 50 && x % 140 < 90);
      const amplitude = isBurst ? (height * 0.38) * noise : (height * 0.08) * noise;
      const y = centerY + amplitude;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
    ctx.shadowBlur = 0;

    phase += 0.06;
    animationId = requestAnimationFrame(draw);
  }

  draw();
}

/* --------------------------------------------------------------------------
   TELEMETRY CONSOLE TICKER
   -------------------------------------------------------------------------- */
function initTelemetryConsole() {
  const consoleEl = document.getElementById('dashConsole');
  if (!consoleEl) return;

  const messages = [
    "STM32F4 Core Initialization ... OK",
    "EMG Analog Front-End Signal Sync @ 1.2kHz",
    "CAN Bus Telemetry Stream Active [node_0x1A]",
    "PWM Servo Timers Aligned — Duty Cycle 15%",
    "Motor Driver Thermal Telemetry: 31.4°C",
    "YOLO v8 Micro Model Weights Loaded [TFLite]",
    "Closed-loop PID Step Response: 0.128s"
  ];

  let index = 0;

  setInterval(() => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const msg = messages[index % messages.length];
    
    const line = document.createElement('div');
    line.className = 'console-line';
    line.innerHTML = `<span class="console-time">[${timeStr}]</span> <span>${msg}</span>`;
    
    consoleEl.appendChild(line);
    if (consoleEl.children.length > 4) {
      consoleEl.removeChild(consoleEl.children[0]);
    }
    consoleEl.scrollTop = consoleEl.scrollHeight;

    index++;
  }, 2200);
}

/* --------------------------------------------------------------------------
   CASE STUDY DATA & MODAL CONTROLLER
   -------------------------------------------------------------------------- */
const caseStudies = {
  project1: {
    title: "Myoelectric Prosthetic Arm & Bionic Hand",
    category: "BIOMEDICAL ROBOTICS · EMBEDDED SYSTEMS",
    sections: [
      { num: "01", title: "Overview", content: "A myoelectric prosthetic hand project focused on translating surface electromyography (sEMG) muscle signals into controlled finger movements using embedded electronics, dedicated motor drivers, actuators, and a lightweight tendon-driven mechanical structure." },
      { num: "02", title: "Problem", content: "Commercial upper-limb prosthetics are often prohibitively expensive or lack responsiveness. Patients require robust, low-latency grip actuation that can reliably classify subtle muscle contractions into natural hand gestures." },
      { num: "03", title: "Objective", content: "Design a low-cost, 3D-printable 5-digit prosthetic hand governed by an STM32 microcontroller capable of real-time EMG filtering, pattern gesture recognition, and precise tendon tension control." },
      { 
        num: "04", 
        title: "System Architecture", 
        diagram: `+-------------------+    +----------------------+    +-------------------+    +--------------------+\n| sEMG Muscle Sensor | -> | Analog Filtering & ADC| -> | STM32 Microcontroller| -> | PWM Motor Drivers  |\n+-------------------+    +----------------------+    +-------------------+    +--------------------+\n                                                                                       |\n                                                                                       v\n                                                                              +--------------------+\n                                                                              | Tendon Actuators   |\n                                                                              +--------------------+`
      },
      { 
        num: "05", 
        title: "Hardware Component List", 
        hardwareTable: [
          { item: "STM32F401RE", spec: "ARM Cortex-M4 @ 84MHz", role: "Central Signal Processing & PID Control" },
          { item: "MyoWare 2.0 / sEMG Module", spec: "Bipolar Surface Electrodes", role: "Muscle Potential Detection" },
          { item: "N20 Micro Gear Motors", spec: "12V 300RPM with Metal Gears", role: "Individual Finger Flexion Actuation" },
          { item: "DRV8833 Dual H-Bridge", spec: "Low-voltage Motor Driver", role: "PWM Control & Current Sensing" },
          { item: "PETG / TPU 3D Printed Frame", spec: "Tendon-driven flexure joints", role: "Anatomical Mechanical Structure" }
        ]
      },
      { num: "06", title: "Software Stack & Control Flow", content: "Written in Embedded C (STM32CubeIDE). Implemented a digital Bandpass Filter (20Hz - 450Hz) and Notch Filter (50Hz powerline noise suppression). RMS voltage envelope calculation determines trigger thresholds for grasp modes." },
      { 
        num: "07", 
        title: "3D-Printing Fabrication & Prototyping Journey Video", 
        content: "Watch the rapid 3D printing fabrication, mechanical tendon assembly, and live hardware prototyping journey of the custom myoelectric prosthetic arm / bionic hand.", 
        videos: [
          {
            title: "Myoelectric Prosthetic Arm — 3D Printing & Prototyping Fabrication Video (DURA0789)",
            src: "assets/projects/bionic-hand-journey.mp4",
            poster: "assets/projects/bionic-hand-ball-grasp.jpg"
          }
        ]
      },
      { 
        num: "08", 
        title: "Hardware Prototype & sEMG Calibration Bench Gallery", 
        content: "Real-time hardware test bench showing the 3D-printed 5-digit bionic prosthetic hand assembly connected to the microcontroller driver circuit and forearm surface EMG electrodes for firmware tuning, filter cutoff adjustment, and gesture classification calibration.", 
        photoGallery: [
          { src: "assets/projects/bionic-hand-dev.jpg", caption: "sEMG Electrode Muscle Testing & Firmware Calibration Test Bench" },
          { src: "assets/projects/bionic-hand.jpg", caption: "3D-Printed Myoelectric Prosthetic Arm Hardware Assembly" },
          { src: "assets/projects/bionic-hand-ball-grasp.jpg", caption: "Prosthetic Hand Dynamic Sphere/Ball Grasping Action" },
          { src: "assets/projects/bionic-hand-bottle-grasp.jpg", caption: "Cylindrical Object / Bottle Grip Testing Bench" },
          { src: "assets/projects/bionic-hand-video-poster.jpg", caption: "Smart India Hackathon 2024 — Live Patient Fitting & sEMG Electrode Testing" },
          { src: "assets/achievements/sih2024-moment.jpg", caption: "Smart India Hackathon 2024 (Hardware Edition) — Day 2 Prototyping & Live Tuning" },
          { src: "assets/achievements/sih2024-certificate.jpg", caption: "Smart India Hackathon 2024 — Official Grand Finale Winner Certificate (Rohith R)" }
        ] 
      },
      { num: "09", title: "Development & Mechanical Fabrication", content: "Iterative CAD modeling in Autodesk Fusion 360 with custom mechanical flexure hinges. Muscle signal traces were validated via oscilloscope and tuned for minimal delay." },
      { num: "10", title: "Testing & Validation", content: "Evaluated gesture recognition latency across 5 subjects. Achieved consistent power grip, pinch grip, and index point actuation with average response delay under 95ms." },
      { num: "11", title: "Results & Key Metrics", content: "Successfully translated sEMG muscle contractions into 4 distinct grasp patterns with a total system weight under 380 grams." },
      { num: "12", title: "Future Improvements", content: "Integration of tactile force feedback sensors on fingertips and lightweight machine learning (TFLite Micro) gesture classification directly on-chip." }
    ]
  },

  project2: {
    title: "AgroX — Smart Pesticide Spraying Rover",
    category: "ROBOTICS · AI · AGRITECH",
    sections: [
      { num: "01", title: "Overview", content: "An intelligent agricultural rover designed to identify plant conditions using camera-based machine learning and perform targeted pesticide spraying, drastically reducing chemical runoff and operational costs." },
      { num: "02", title: "Problem", content: "Conventional uniform pesticide spraying wastes up to 70% of chemical solutions, damages soil health, and exposes agricultural workers to harmful toxins." },
      { num: "03", title: "Objective", content: "Develop an autonomous, off-road wheel rover equipped with edge AI camera detection to identify crop leaf disease and trigger precise spot-spraying valves." },
      { 
        num: "04", 
        title: "System Architecture", 
        diagram: `+-------------------+    +----------------------+    +--------------------+    +---------------------+\n| Camera Feed (CSI) | -> | Raspberry Pi 4 (YOLO)| -> | UART Serial Comms  | -> | ESP32-S3 Motor/Pump |\n+-------------------+    +----------------------+    +--------------------+    +---------------------+\n                                                                                        |\n                                                                                        v\n                                                                               +---------------------+\n                                                                               | Solenoid Spray Valve|\n                                                                               +---------------------+`
      },
      { 
        num: "05", 
        title: "Hardware Component List", 
        hardwareTable: [
          { item: "Raspberry Pi 4 (4GB)", spec: "Quad-Core ARM Cortex-A72", role: "Edge AI Model Inference" },
          { item: "ESP32-S3", spec: "Dual-Core Xtensa LX7", role: "Rover Navigation & Solenoid Control" },
          { item: "12V High-Torque DC Motors", spec: "Planetary Gearbox + Encoders", role: "All-Terrain Skid Steering" },
          { item: "12V Diaphragm Pump", spec: "3.5L/min 100 PSI", role: "Targeted Micro-Spraying" },
          { item: "Raspberry Pi HQ Camera", spec: "12.3 MP Sony IMX477", role: "Crop Canopy Inspection" }
        ]
      },
      { 
        num: "06", 
        title: "Project Journey & Live Working Demonstration Videos", 
        content: "Watch the development journey, mechanical fabrication, and live field spraying demonstration of the AgroX autonomous rover.", 
        videos: [
          {
            title: "AgroX Product Development Journey",
            src: "assets/projects/agrox-journey.mp4",
            poster: "assets/projects/agrox-working-team.jpg"
          },
          {
            title: "AgroX Live Working & Spraying Demonstration",
            src: "assets/projects/agrox-working.mp4",
            poster: "assets/projects/agrox-spraying.jpg"
          }
        ]
      },
      { 
        num: "07", 
        title: "Field Trial & Prototype Build Gallery", 
        content: "Authentic engineering photographs showcasing team prototype assembly, circuit wiring, mechanical nozzle fabrication, and live rover field spraying trials.", 
        photoGallery: [
          { src: "assets/achievements/info-hackathon-first-prize.jpg", caption: "INFO Hackathon TRISQUADATHON '25 — Overall Innovation 1st Prize Trophy & Winner Ceremony" },
          { src: "assets/projects/agrox-working-team.jpg", caption: "Hardware Assembly & Circuit Wiring (Team Black 2.0)" },
          { src: "assets/projects/agrox.jpg", caption: "AgroX Smart Rover Front View with Touchscreen" },
          { src: "assets/projects/agrox-standing.jpg", caption: "AgroX Full Rover Scale & Testing Demonstration" },
          { src: "assets/projects/agrox-soldering.jpg", caption: "Embedded Control Board Wiring & Motor Driver Setup" },
          { src: "assets/projects/agrox-assembly.jpg", caption: "Sprayer Mechanism & Diaphragm Pump Integration" },
          { src: "assets/projects/agrox-spraying.jpg", caption: "High-Pressure Targeted Spot Spraying Test" }
        ] 
      },
      { num: "08", title: "Software & AI Pipeline", content: "Constructed a lightweight YOLOv8-nano model trained on plant disease datasets, quantized to TensorFlow Lite (TFLite) for 24 FPS inference on Raspberry Pi." },
      { num: "09", title: "Testing & Field Trials", content: "Tested in greenhouse and field environments. Verified selective spraying accuracy of 92% on infected foliage." },
      { num: "10", title: "Results & Impact", content: "Reduced overall pesticide consumption by up to 60% in simulated field trials with zero false triggers on healthy crops." }
    ]
  },

  project3: {
    title: "Plant Disease & Fruit Quality Detection",
    category: "AI · COMPUTER VISION",
    sections: [
      { num: "01", title: "Overview", content: "A computer vision project leveraging deep learning image classification and object detection techniques to evaluate agricultural product quality and plant health." },
      { num: "02", title: "Problem", content: "Manual crop inspection is labor-intensive, subjective, and prone to human error during post-harvest sorting and grading." },
      { num: "03", title: "Objective", content: "Build an automated computer vision pipeline capable of detecting leaf rust, blight, and fruit ripeness/defects under varying lighting conditions." },
      { 
        num: "04", 
        title: "Pipeline Architecture", 
        diagram: `+--------------------+    +----------------------+    +--------------------+    +----------------------+\n| Image Acquisition  | -> | OpenCV Preprocessing | -> | YOLO Neural Net    | -> | Bounding Box & Class |\n+--------------------+    +----------------------+    +--------------------+    +----------------------+`
      },
      { 
        num: "05", 
        title: "Software & Model Specifications", 
        hardwareTable: [
          { item: "Model Architecture", spec: "YOLOv8 / MobileNetV3", role: "Object Detection & Classification" },
          { item: "Framework", spec: "Python, PyTorch, OpenCV", role: "Training, Augmentation & Pipeline" },
          { item: "Inference Engine", spec: "ONNX Runtime / TFLite", role: "High-speed Local Deployment" }
        ]
      },
      { 
        num: "06", 
        title: "Live Application Interface & Classification UI", 
        content: "Interactive Fruit Quality Checker web application interface featuring live image upload, deep learning classification prediction (99.6% model confidence score), and automated quality recommendation status (GOOD TO BUY).", 
        photoGallery: [
          "assets/projects/plant-disease.jpg"
        ] 
      },
      { num: "07", title: "Image Preprocessing & Augmentation", content: "Custom OpenCV contrast enhancement (CLAHE), color space conversion (HSV / LAB), and automated background segmentation for robust feature extraction." },
      { num: "08", title: "Model Training & Accuracy Tuning", content: "Trained on over 4,500 annotated agricultural images with data augmentation (flips, rotations, brightness shifts)." },
      { num: "09", title: "Validation Results & Performance", content: "Achieved 94.2% mean Average Precision (mAP@0.5) across 8 defect classes." },
      { num: "10", title: "Future Improvements", content: "Integration with conveyer-belt hardware triggers and sorting actuators." }
    ]
  },

  project4: {
    title: "Peristaltic Pump Control System",
    category: "BIOMEDICAL ENGINEERING / EMBEDDED SYSTEMS",
    sections: [
      { num: "01", title: "Overview", content: "An embedded fluid-control system using a peristaltic pump for controlled and precise liquid delivery, with adjustable flow control and real-time monitoring." },
      { num: "02", title: "Problem", content: "Precision liquid dosing in biomedical and analytical environments requires steady, sterile fluid delivery without fluid-contact contamination or pulsation spikes." },
      { num: "03", title: "System Design", content: "Designed around an STM32 microcontroller driving a peristaltic pump assembly via H-Bridge driver with closed-loop flow measurement and live LCD status readout." },
      { 
        num: "04", 
        title: "Hardware Architecture", 
        hardwareTable: [
          { item: "STM32F4 Microcontroller", spec: "ARM Cortex-M4 @ 84MHz", role: "PWM Generation & Flow Logic" },
          { item: "Peristaltic Pump Assembly", spec: "12V DC / Stepper Drive", role: "Sterile Liquid Displacement" },
          { item: "DRV8825 / L298N Driver", spec: "Microstepping H-Bridge", role: "Precision Motor Speed Control" },
          { item: "16x2 I2C LCD Display", spec: "Standard Character LCD", role: "Real-time Flow Rate Telemetry" }
        ]
      },
      { 
        num: "05", 
        title: "Live Working & Pumping Demonstration Video", 
        content: "Watch the operational test of the custom 3D-printed peristaltic pump system, demonstrating stepper motor PWM drive control, smooth rotor compression, and fluid displacement with the connected embedded control electronics.", 
        videoSrc: "assets/projects/peristaltic-pump.mp4",
        videoTitle: "Peristaltic Pump Operational Testing & Fluid Dispensing",
        videoPoster: "assets/projects/peristaltic-pump.jpg"
      },
      { 
        num: "06", 
        title: "Custom 3D-Printed Pump Head & Rotor Prototype", 
        content: "Authentic engineering photograph of the custom 3D-printed peristaltic pump assembly, featuring high-precision triangular rotor with triple roller mounts, smooth-glide internal stator track for flexible tubing compression, and secure chassis fastening points designed for zero-contamination fluid displacement.", 
        photoGallery: [
          { src: "assets/projects/peristaltic-pump.jpg", caption: "Custom 3D-Printed Peristaltic Pump Casing & Triangular Rotor Roller Assembly" }
        ] 
      },
      { num: "07", title: "Control Method", content: "Implemented closed-loop PWM speed regulation with interrupt-driven pulse counting for precise volumetric calibration per unit time." },
      { num: "08", title: "Working Principle", content: "Compression rollers squeeze flexible silicone tubing inside the rotor casing, drawing and displacing exact fluid packets per revolution." },
      { num: "09", title: "Results", content: "Achieved smooth, linear flow adjustment from 0.5 mL/min to 50 mL/min with less than 3% volumetric deviation." },
      { num: "10", title: "Future Improvements", content: "Integration of Wi-Fi remote dosage monitoring and anti-drip reverse pulse retraction upon flow completion." }
    ]
  },

  project5: {
    title: "Water Drowning Detection & Rescue System",
    category: "BIOMEDICAL / SAFETY TECHNOLOGY",
    sections: [
      { num: "01", title: "Overview", content: "A real-time water safety system designed to detect possible drowning incidents and trigger an automatic alert and rescue mechanism." },
      { num: "02", title: "Problem", content: "Accidental drowning occurs rapidly and quietly, often in unmonitored pools or open water bodies where human emergency response delay can be critical." },
      { num: "03", title: "Detection Method", content: "Combines MPU6050 6-axis motion dynamics (accelerometer & gyroscope) with immersion threshold tracking to distinguish swimming motion from distressed submersion." },
      { 
        num: "04", 
        title: "System Architecture", 
        diagram: `+-----------------------+    +-----------------------+    +------------------------+\n| MPU6050 IMU + Sensor  | -> | ESP32 Microcontroller | -> | RF Transmitter Beacon  |\n+-----------------------+    +-----------------------+    +------------------------+\n                                                                      |\n                                                                      v\n                                                           +------------------------+\n                                                           | Auto Rescue Float / Alarm|\n                                                           +------------------------+`
      },
      { 
        num: "05", 
        title: "Hardware Component List", 
        hardwareTable: [
          { item: "ESP32 Controller", spec: "2.4GHz Wi-Fi / BLE + Dual Core", role: "Signal Processing & Wireless Trigger" },
          { item: "MPU6050 IMU", spec: "3-axis Gyro + 3-axis Accelerometer", role: "Distressed Motion Pattern Detection" },
          { item: "Micro DC Air Pump", spec: "3V–6V High Pressure Diaphragm", role: "Rapid Inflatable Float Deployment" },
          { item: "Inflatable Buoyancy Collar", spec: "High-Visibility Safety Airbag", role: "Automated Neck Buoyancy Collar" },
          { item: "Water Submersion Sensor", spec: "Resistive / Pressure Contact", role: "Continuous Depth & Water Contact Check" },
          { item: "Rechargeable Power Pack", spec: "Multi-cell High Current Battery Array", role: "Portable Autonomous Power Source" }
        ]
      },
      { 
        num: "06", 
        title: "Wearable Prototype Hardware & Build Gallery", 
        content: "Authentic engineering photographs of the wearable Drowning Detection & Rescue System vest featuring the custom PCB board, ESP32 microcontroller, status indicator LEDs, rechargeable battery pack, miniature DC air pump, pneumatic tubing, and neck-mounted automatic inflatable buoyancy collar deployment demonstration.", 
        photoGallery: [
          { src: "assets/projects/drowning-detection-deployed.jpg", caption: "Wearable Vest with Deployed Inflatable Buoyancy Collar & Mini Air Pump Demonstration" },
          { src: "assets/projects/drowning-detection.jpg", caption: "Rear Control Unit: Custom Sensor PCB, Microcontroller, Status LEDs & Multi-cell Battery Array" }
        ] 
      },
      { num: "07", title: "Working Principle & Submersion Detection", content: "The wearable sensor node samples body orientation and motion frequencies. If motion drops below thresholds during prolonged submersion, the rescue protocol activates." },
      { num: "08", title: "Alert Mechanism & Buoyancy Deploy", content: "Triggers loud acoustic sirens at the poolside gateway, sends wireless alert packets, and deploys automatic buoyancy float inflation." },
      { num: "09", title: "Results & Testing Performance", content: "Prototype successfully identified simulated submersion distress and initiated rescue deployment within 4.2 seconds." },
      { num: "10", title: "Future Improvements", content: "Miniaturized waterproof wristband form-factor and computer vision multi-camera pool monitoring integration." }
    ]
  },

  project6: {
    title: "Autonomous Mobile Robot (AMR) for Warehouse Automation",
    category: "ROBOTICS / AUTONOMOUS SYSTEMS",
    sections: [
      { num: "01", title: "Overview", content: "An autonomous mobile robot concept for warehouse material handling, navigation and dynamic obstacle avoidance." },
      { num: "02", title: "Problem", content: "Manual material transportation in warehouse environments is repetitive, time-consuming, and prone to logistical delays." },
      { num: "03", title: "Robot Architecture", content: "Differential-drive robot platform with 360° 2D LiDAR laser scanner, optical wheel encoders, motor drivers, and ROS controller node." },
      { 
        num: "04", 
        title: "System Architecture", 
        diagram: `+--------------------+    +----------------------+    +--------------------+    +---------------------+\n| 2D LiDAR + Encoders| -> | ROS Navigation Stack | -> | move_base / Costmap| -> | Differential Drive  |\n+--------------------+    +----------------------+    +--------------------+    +---------------------+`
      },
      { 
        num: "05", 
        title: "Navigation & SLAM", 
        hardwareTable: [
          { item: "2D LiDAR Scanner", spec: "360° Scan, 8m Range", role: "Environment Perception & Mapping" },
          { item: "ROS (Robot Operating System)", spec: "ROS Noetic / Melodic", role: "Navigation & Path Planning Framework" }
        ]
      },
      { 
        num: "06", 
        title: "Prototype Hardware & Build Gallery", 
        content: "Physical engineering prototype of the Autonomous Mobile Robot featuring a high-durability chassis, 4-wheel drive train with gold-accented rims, vertical sensor mast with camera turret, and ROS control electronics.", 
        photoGallery: [
          "assets/projects/warehouse-amr.jpg"
        ] 
      },
      { num: "07", title: "Obstacle Avoidance & ROS Navigation", content: "Utilizes ROS costmaps (global and local) to real-time update dynamic obstacle boundaries and recalculate optimal paths." },
      { num: "08", title: "Motor Control & Velocity Loop", content: "PID velocity control loop implemented on microcontrollers receiving geometry_msgs/Twist commands from ROS." },
      { num: "09", title: "Results & Field Performance", content: "Successfully generated 2D occupancy grid maps and navigated complex indoor obstacle courses autonomously." },
      { num: "10", title: "Future Improvements", content: "3D Depth camera integration for low-hanging obstacles, fleet management sync, and auto-docking charging stations." }
    ]
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  const modalClose = document.getElementById('modalClose');
  const modalHeaderTitle = document.getElementById('modalHeaderTitle');
  const modalBody = document.getElementById('modalBody');
  const csButtons = document.querySelectorAll('.view-case-study-btn');

  if (!modal) return;

  document.addEventListener('click', (e) => {
    // If click is on proof button or close button, don't handle here
    if (e.target.closest('.view-proof-btn') || e.target.closest('#modalClose')) return;

    const btn = e.target.closest('.view-case-study-btn, [data-project]');
    if (!btn) return;

    e.preventDefault();
    const id = btn.getAttribute('data-project');
    if (!id) return;

    const data = caseStudies[id];
    if (data) {
      if (modalHeaderTitle) modalHeaderTitle.textContent = data.title;

      let html = `
        <div class="cs-section" style="margin-bottom: 24px;">
          <div class="mono-tag">${data.category}</div>
          <h2 style="font-size: 2rem; margin-top: 8px;">${data.title}</h2>
        </div>
      `;

      data.sections.forEach(sec => {
        html += `
          <div class="cs-section">
            <div class="cs-num">${sec.num} — ${sec.title.toUpperCase()}</div>
            <h3 class="cs-title">${sec.title}</h3>
            ${sec.content ? `<p class="cs-content">${sec.content}</p>` : ''}
            ${sec.diagram ? `<pre class="cs-diagram-box">${sec.diagram}</pre>` : ''}
            ${sec.videos ? `
              <div class="cs-videos-list" style="display: flex; flex-direction: column; gap: 20px; margin-top: 16px;">
                ${sec.videos.map((vid, idx) => `
                  <div class="cs-video-card" style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); background: #080404; padding: 16px;">
                    <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--accent-red); font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                      <span>▶</span> ${vid.title || `Demonstration Video ${idx + 1}`}
                    </div>
                    <video controls playsinline preload="metadata" poster="${vid.poster || 'assets/projects/agrox.jpg'}" style="width: 100%; max-height: 480px; border-radius: var(--radius-sm); background: #000; display: block; margin: 0 auto; box-shadow: 0 8px 30px rgba(0,0,0,0.8);">
                      <source src="${vid.src}" type="video/mp4">
                      <source src="${vid.src}" type="video/quicktime">
                      <source src="${vid.src}" type="video/webm">
                      Your browser does not support the video tag.
                    </video>
                    <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                      <a href="${vid.src}" target="_blank" download style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-primary); text-decoration: none; padding: 5px 14px; background: rgba(255, 59, 48, 0.15); border: 1px solid rgba(255, 59, 48, 0.35); border-radius: var(--radius-pill); transition: all 0.2s ease;">
                        Download Video ↗
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${sec.videoSrc && !sec.videos ? `
              <div class="cs-video-container" style="margin-top: 16px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); background: #080404; padding: 16px;">
                <div style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--accent-red); font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                  <span>▶</span> ${sec.videoTitle || 'AgroX Development Journey & Demonstration'}
                </div>
                <video controls playsinline preload="metadata" poster="${sec.videoPoster || 'assets/projects/agrox-working-team.jpg'}" style="width: 100%; max-height: 480px; border-radius: var(--radius-sm); background: #000; display: block; margin: 0 auto; box-shadow: 0 8px 30px rgba(0,0,0,0.8);">
                  <source src="${sec.videoSrc}" type="video/mp4">
                  <source src="${sec.videoSrc}" type="video/webm">
                  Your browser does not support the video tag.
                </video>
                <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                  <a href="${sec.videoSrc}" target="_blank" download style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-primary); text-decoration: none; padding: 6px 16px; background: rgba(255, 59, 48, 0.15); border: 1px solid rgba(255, 59, 48, 0.35); border-radius: var(--radius-pill); transition: all 0.2s ease;">
                    Download Video ↗
                  </a>
                </div>
              </div>
            ` : ''}
            ${sec.videoEmbed ? `
              <div class="cs-video-embed" style="margin-top: 16px; position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--border-medium);">
                <iframe src="${sec.videoEmbed}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:0;" allowfullscreen></iframe>
              </div>
            ` : ''}
            ${sec.photoGallery ? `
              <div class="cs-photo-gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 16px;">
                ${sec.photoGallery.map((item, i) => {
                  const imgSrc = typeof item === 'string' ? item : item.src;
                  const caption = typeof item === 'string' ? `${sec.title} — Photo ${i+1}` : item.caption;
                  const svgFallback = imgSrc.replace(/\.(jpg|png|jpeg)$/i, '.svg');
                  return `
                    <div class="view-proof-btn" data-proof-src="${imgSrc}" data-proof-title="${caption}" style="border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); aspect-ratio: 16/11; background: #080404; position: relative; cursor: pointer; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                      <img src="${imgSrc}" alt="${caption}" style="width:100%; height:100%; object-fit: cover; display:block;" onerror="this.onerror=null; this.src='${svgFallback}';">
                      <div style="position: absolute; bottom:0; left:0; right:0; padding: 10px 12px; background: linear-gradient(180deg, transparent 0%, rgba(6,4,4,0.94) 100%); font-size: 0.78rem; color: #fff; font-weight: 500; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">
                        ${caption}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
            ${sec.hardwareTable ? `
              <table class="hardware-list-table">
                <thead>
                  <tr><th>Component / Metric</th><th>Specification</th><th>Function / Result</th></tr>
                </thead>
                <tbody>
                  ${sec.hardwareTable.map(row => `
                    <tr>
                      <td><strong>${row.item}</strong></td>
                      <td>${row.spec}</td>
                      <td>${row.role}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : ''}
          </div>
        `;
      });

      if (modalBody) modalBody.innerHTML = html;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    const videos = modal.querySelectorAll('video');
    videos.forEach(v => {
      try { v.pause(); } catch(e){}
    });
  }
}

/* --------------------------------------------------------------------------
   ACHIEVEMENT & HARDWARE PROOF MODAL VIEWER (PHOTO & VIDEO SUPPORT)
   -------------------------------------------------------------------------- */
function initProofModal() {
  const modal = document.getElementById('caseStudyModal');
  const modalHeaderTitle = document.getElementById('modalHeaderTitle');
  const modalBody = document.getElementById('modalBody');

  if (!modal) return;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-proof-btn');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const src = btn.getAttribute('data-proof-src');
    const title = btn.getAttribute('data-proof-title');
    if (!src) return;

    const isVideo = /\.(mp4|webm|mov|ogg)$/i.test(src);
    const isDoc = /certificate|award|prize|hall-of-fame|internship|credential|proof/i.test(src);
    const badgeText = isVideo 
      ? "AUTHENTIC HARDWARE WORKING & DEMONSTRATION VIDEO" 
      : (isDoc ? "VERIFIED OFFICIAL PROOF DOCUMENT" : "AUTHENTIC HARDWARE PROTOTYPE PHOTOGRAPH");

    if (modalHeaderTitle) {
      modalHeaderTitle.textContent = title || (isVideo ? "Hardware Demonstration Video" : (isDoc ? "Verified Official Certificate Document" : "Hardware Prototype Photograph"));
    }

    if (modalBody) {
      if (isVideo) {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 8px 0;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-red); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
              ${badgeText}
            </div>
            <div style="width: 100%; max-width: 820px; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); box-shadow: 0 16px 40px rgba(0,0,0,0.9); background: #060404; display: inline-block; padding: 12px; margin: 0 auto;">
              <video controls autoplay playsinline preload="metadata" poster="assets/projects/bionic-hand-ball-grasp.jpg" style="width: 100%; max-height: 72vh; border-radius: var(--radius-sm); background: #000; display: block; margin: 0 auto;">
                <source src="${src}" type="video/mp4">
                <source src="${src}" type="video/quicktime">
                <source src="${src}" type="video/webm">
                Your browser does not support the video tag.
              </video>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding: 0 4px;">
                <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-secondary); text-align: left;">
                  Hardware Prototype: Myoelectric Prosthetic Arm
                </div>
                <a href="${src}" target="_blank" download style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-primary); text-decoration: none; padding: 6px 16px; background: rgba(255, 59, 48, 0.15); border: 1px solid rgba(255, 59, 48, 0.35); border-radius: var(--radius-pill); transition: all 0.2s ease;">
                  Download Video ↗
                </a>
              </div>
            </div>
          </div>
        `;
      } else {
        const pngFallback = src.replace(/\.(jpg|png|svg)$/i, '.png');
        const svgFallback = src.replace(/\.(jpg|png|svg)$/i, '.svg');

        modalBody.innerHTML = `
          <div style="text-align: center; padding: 8px 0;">
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-red); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em;">
              ${badgeText}
            </div>
            <div style="max-width: 100%; border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-medium); box-shadow: 0 16px 40px rgba(0,0,0,0.9); background: #060404; display: inline-block; padding: 8px;">
              <img 
                src="${src}" 
                alt="${title || 'Hardware Prototype'}" 
                style="max-width: 100%; height: auto; max-height: 75vh; object-fit: contain; display: block; border-radius: var(--radius-sm);"
                onerror="if(!this.triedPng){this.triedPng=true;this.src='${pngFallback}';}else{this.onerror=null;this.src='${svgFallback}';}"
              >
            </div>
          </div>
        `;
      }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

/* --------------------------------------------------------------------------
   INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(el => observer.observe(el));
}
