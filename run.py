"""
run.py - One-command launcher for Varshith Portfolio
-----------------------------------------------------
Starts both servers concurrently:
  * FastAPI backend  -> http://127.0.0.1:8000
  * Vite frontend    -> http://localhost:5173

Usage:
    python run.py

Press Ctrl+C to stop both servers at once.
"""

import subprocess
import sys
import os
import signal
import threading
import time

# Force UTF-8 output so special chars from Vite do not crash
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT, "backend")

if sys.platform == "win32":
    VENV_PYTHON = os.path.join(BACKEND_DIR, ".venv", "Scripts", "python.exe")
    NPM_CMD = "npm.cmd"
else:
    VENV_PYTHON = os.path.join(BACKEND_DIR, ".venv", "bin", "python")
    NPM_CMD = "npm"

RESET  = "\033[0m"
CYAN   = "\033[96m"
GREEN  = "\033[92m"
YELLOW = "\033[93m"
RED    = "\033[91m"
BOLD   = "\033[1m"

def tag(label, color):
    return f"{color}{BOLD}[{label}]{RESET}"

def stream_output(proc, label, color):
    for line in iter(proc.stdout.readline, b""):
        text = line.decode("utf-8", errors="replace").rstrip()
        try:
            print(f"{tag(label, color)} {text}", flush=True)
        except UnicodeEncodeError:
            # Fallback: strip non-ASCII if terminal still can't handle it
            safe = text.encode("ascii", errors="replace").decode("ascii")
            print(f"{tag(label, color)} {safe}", flush=True)

processes = []

def shutdown(sig=None, frame=None):
    print(f"\n{YELLOW}{BOLD}Shutting down all servers...{RESET}", flush=True)
    for p in processes:
        try:
            if sys.platform == "win32":
                p.send_signal(signal.CTRL_BREAK_EVENT)
            else:
                p.terminate()
        except Exception:
            pass
    time.sleep(1)
    for p in processes:
        try:
            p.kill()
        except Exception:
            pass
    print(f"{GREEN}All servers stopped. Goodbye!{RESET}", flush=True)
    sys.exit(0)

signal.signal(signal.SIGINT, shutdown)
signal.signal(signal.SIGTERM, shutdown)

# ── Backend ────────────────────────────────────────────────────────────────────
print(f"{tag('BACKEND', CYAN)} Starting FastAPI on http://127.0.0.1:8000 ...", flush=True)

backend_proc = subprocess.Popen(
    [VENV_PYTHON, "main.py"],
    cwd=BACKEND_DIR,
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if sys.platform == "win32" else 0,
)
processes.append(backend_proc)
threading.Thread(target=stream_output, args=(backend_proc, "BACKEND", CYAN), daemon=True).start()

time.sleep(1.5)

# ── Frontend ───────────────────────────────────────────────────────────────────
print(f"{tag('FRONTEND', GREEN)} Starting Vite dev server on http://localhost:5173 ...", flush=True)

env = os.environ.copy()
env["FORCE_COLOR"] = "0"   # Disable Vite colour codes in piped mode

frontend_proc = subprocess.Popen(
    [NPM_CMD, "run", "dev"],
    cwd=ROOT,
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    env=env,
    creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if sys.platform == "win32" else 0,
)
processes.append(frontend_proc)
threading.Thread(target=stream_output, args=(frontend_proc, "FRONTEND", GREEN), daemon=True).start()

time.sleep(2)
print(f"""
{BOLD}--------------------------------------------------{RESET}
  {GREEN}Frontend{RESET} ->  http://localhost:5173
  {CYAN}Backend {RESET} ->  http://127.0.0.1:8000
{BOLD}--------------------------------------------------{RESET}
  Press {YELLOW}Ctrl+C{RESET} to stop all servers
{BOLD}--------------------------------------------------{RESET}
""", flush=True)

# ── Keep-alive loop ────────────────────────────────────────────────────────────
try:
    while True:
        for proc, name in zip(processes, ["Backend", "Frontend"]):
            if proc.poll() is not None:
                print(f"{RED}{BOLD}[!] {name} crashed (exit {proc.returncode}). Shutting down.{RESET}", flush=True)
                shutdown()
        time.sleep(2)
except KeyboardInterrupt:
    shutdown()
